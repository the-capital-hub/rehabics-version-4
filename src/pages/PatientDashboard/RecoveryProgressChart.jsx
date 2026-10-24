
import React, { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, RefreshCw, TrendingUp } from "lucide-react";
import "./RecoveryProgressChart.css";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

// Set this only after confirming the real patient progress endpoint.
const PROGRESS_ENDPOINT = (
  import.meta.env.VITE_PATIENT_PROGRESS_ENDPOINT || ""
).trim();

const getToken = () =>
  localStorage.getItem("rehabics_token") ||
  sessionStorage.getItem("rehabics_token") ||
  localStorage.getItem("token") ||
  sessionStorage.getItem("token");

const getDate = (item) =>
  item.date || item.assessedAt || item.createdAt || item.updatedAt || null;

const getScore = (item) => {
  const candidates = [
    item.mobilityScore,
    item.recoveryScore,
    item.progressScore,
    item.score,
  ];

  return candidates.find(
    (value) => typeof value === "number" && Number.isFinite(value)
  );
};

const getRecords = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.records)) return payload.data.records;
  if (Array.isArray(payload?.records)) return payload.records;
  if (Array.isArray(payload?.assessments)) return payload.assessments;
  return [];
};

const formatDate = (value) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Unknown date";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });
};

export default function RecoveryProgressChart() {
  const [period, setPeriod] = useState("90");
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    const loadProgress = async () => {
      setError("");
      setRecords([]);

      if (!PROGRESS_ENDPOINT) {
        setLoading(false);
        setError(
          "The recovery history API has not been configured yet. No sample scores are being displayed."
        );
        return;
      }

      const token = getToken();

      if (!token) {
        setLoading(false);
        setError("Please sign in to view your recovery history.");
        return;
      }

      setLoading(true);

      try {
        // The endpoint is supplied through configuration after verification.
        const endpoint = PROGRESS_ENDPOINT.startsWith("http")
          ? PROGRESS_ENDPOINT
          : `${API_URL}/${PROGRESS_ENDPOINT.replace(/^\/+/, "")}`;

        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payload = await response.json().catch(() => ({}));

        if (!response.ok) {
          throw new Error(
            payload.message || `Could not load progress (${response.status}).`
          );
        }

        const parsed = getRecords(payload)
          .map((item) => ({
            date: getDate(item),
            score: getScore(item),
          }))
          .filter(
            (item) =>
              item.date &&
              typeof item.score === "number" &&
              Number.isFinite(new Date(item.date).getTime())
          )
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        if (active) setRecords(parsed);
      } catch (fetchError) {
        if (active) {
          setError(
            fetchError.message || "Unable to load recovery history."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadProgress();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const filteredRecords = useMemo(() => {
    if (period === "all" || records.length === 0) return records;

    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - Number(period));

    return records.filter((item) => new Date(item.date) >= cutoff);
  }, [records, period]);

  const chartData = useMemo(
    () =>
      filteredRecords.map((item) => ({
        ...item,
        label: formatDate(item.date),
      })),
    [filteredRecords]
  );

  const latest = filteredRecords.at(-1);
  const previous = filteredRecords.at(-2);

  const change =
    latest && previous ? latest.score - previous.score : null;

  return (
    <section className="recoveryChartCard">
      <div className="recoveryChartHeader">
        <div>
          <span className="recoveryChartEyebrow">
            <Activity size={14} />
            RECOVERY INSIGHTS
          </span>
          <h2>Recovery progress</h2>
          <p>Track the assessment scores recorded by your care team.</p>
        </div>

        <button
          className="recoveryRefreshButton"
          onClick={() => setReloadKey((value) => value + 1)}
          disabled={loading}
          aria-label="Refresh recovery data"
        >
          <RefreshCw size={16} className={loading ? "isRefreshing" : ""} />
          Refresh
        </button>
      </div>

      <div className="recoveryChartControls">
        <div className="recoveryLatestScore">
          <span>Latest recorded score</span>
          <strong>
            {latest ? latest.score : "—"}
            {latest && <small> / 100</small>}
          </strong>
        </div>

        <div className="recoveryPeriodSwitch" aria-label="Chart date range">
          {[
            { label: "30 days", value: "30" },
            { label: "90 days", value: "90" },
            { label: "All time", value: "all" },
          ].map((option) => (
            <button
              key={option.value}
              className={period === option.value ? "active" : ""}
              onClick={() => setPeriod(option.value)}
              aria-pressed={period === option.value}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {latest && (
        <div className="recoveryChartSummary">
          <span className="recoverySummaryIcon">
            <TrendingUp size={17} />
          </span>
          <span>
            {change === null
              ? `Latest assessment recorded on ${formatDate(latest.date)}`
              : `${Math.abs(change)} point ${
                  change > 0 ? "increase" : change < 0 ? "decrease" : "change"
                } since the previous recorded assessment`}
          </span>
        </div>
      )}

      <div className="recoveryChartPlot">
        {loading ? (
          <div className="recoveryChartState">
            <span className="recoveryChartLoader" />
            <p>Loading your recorded assessments</p>
          </div>
        ) : error ? (
          <div className="recoveryChartState">
            <span className="recoveryChartStateIcon">
              <Activity size={23} />
            </span>
            <strong>Recovery data unavailable</strong>
            <p>{error}</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="recoveryChartState">
            <span className="recoveryChartStateIcon">
              <Activity size={23} />
            </span>
            <strong>No assessments in this period</strong>
            <p>
              Your chart will appear when dated recovery scores are recorded
              by your care team.
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 15, right: 12, left: -18, bottom: 5 }}
            >
              <CartesianGrid
                stroke="#343941"
                strokeDasharray="3 5"
                vertical={false}
              />

              <XAxis
                dataKey="label"
                tick={{ fill: "#AEB4BE", fontSize: 12 }}
                axisLine={{ stroke: "#3B414C" }}
                tickLine={false}
                minTickGap={24}
              />

              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#AEB4BE", fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                ticks={[0, 25, 50, 75, 100]}
              />

              <Tooltip
                contentStyle={{
                  background: "#191B1E",
                  border: "1px solid #3B414C",
                  borderRadius: 10,
                  color: "#F9F9F8",
                  fontSize: 12,
                }}
                labelStyle={{ color: "#AEB4BE", marginBottom: 5 }}
                formatter={(value) => [`${value} / 100`, "Recorded score"]}
              />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#7CD607"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#7CD607",
                  stroke: "#101112",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 7,
                  fill: "#7CD607",
                  stroke: "#F9F9F8",
                  strokeWidth: 2,
                }}
                connectNulls={false}
                isAnimationActive
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="recoveryChartFooter">
        <span>
          {filteredRecords.length} recorded{" "}
          {filteredRecords.length === 1 ? "assessment" : "assessments"}
        </span>
        <span>Scores are shown as recorded by your care team</span>
      </div>
    </section>
  );
}
