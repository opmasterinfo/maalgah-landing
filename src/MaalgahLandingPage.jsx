import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";

export default function MaalgahLandingPage() {
  const [dailyCalls, setDailyCalls] = useState(60);
  const [afterHoursPct, setAfterHoursPct] = useState(30);
  const [aiAnswerRate, setAiAnswerRate] = useState(80);
  const [conversionRate, setConversionRate] = useState(8);
  const [avgValue, setAvgValue] = useState(120);
  const workingDays = 22;

  const results = useMemo(() => {
    const afterHoursCalls = (dailyCalls * afterHoursPct) / 100;
    const aiAnswered = (afterHoursCalls * aiAnswerRate) / 100;
    const additionalAppointmentsDaily = (aiAnswered * conversionRate) / 100;
    const additionalAppointmentsMonthly =
      additionalAppointmentsDaily * workingDays;
    const monthlyRevenueIncrease =
      additionalAppointmentsMonthly * avgValue;

    return {
      afterHoursCalls: round(afterHoursCalls),
      aiAnswered: round(aiAnswered),
      additionalAppointmentsDaily: round(additionalAppointmentsDaily, 2),
      additionalAppointmentsMonthly: round(additionalAppointmentsMonthly, 1),
      monthlyRevenueIncrease: round(monthlyRevenueIncrease, 2),
    };
  }, [dailyCalls, afterHoursPct, aiAnswerRate, conversionRate, avgValue]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 antialiased">
      {/* HEADER */}
      <header className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center font-bold">
              M
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Maalgah AI
              </h1>
              <p className="text-xs text-gray-400">
                AI calling agents for dental clinics
              </p>
            </div>
          </div>
          <nav className="space-x-6 hidden md:flex text-sm text-gray-300">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#calculator" className="hover:text-white">
              Calculator
            </a>
            <a href="#integrations" className="hover:text-white">
              Integrations
            </a>
            <a
              href="#contact"
              className="bg-indigo-600 px-4 py-2 rounded-lg text-white hover:opacity-95"
            >
              Book demo
            </a>
          </nav>
        </motion.div>
      </header>

      {/* HERO */}
      <main className="max-w-6xl mx-auto px-6">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-extrabold leading-tight">
              Turn missed calls into dental appointments — automatically
            </h2>
            <p className="text-gray-400 max-w-xl">
              Maalgah’s AI calling agent answers after-hours & missed calls,
              qualifies patients, and books appointments directly into your
              practice management software — so you can focus on patients while
              revenue grows.
            </p>
            <div className="flex gap-3">
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 bg-indigo-600 px-5 py-3 rounded-lg font-semibold"
              >
                Try calculator
              </a>
              <button className="inline-flex items-center gap-2 border border-gray-700 px-5 py-3 rounded-lg">
                Watch demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl ring-1 ring-white/6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs text-gray-400">
                      Maalgah AI • Virtual receptionist
                    </div>
                    <div className="font-semibold">Appointment confirmed</div>
                  </div>
                  <div className="text-xs text-gray-500">2:14 PM</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4 space-y-2">
                  <div className="text-sm">
                    Hi, this is Maalgah. I can book you with Dr. Khan. What day
                    works best?
                  </div>
                  <div className="text-xs text-gray-400">
                    Patient: I need next Tuesday
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: [0, 2, -2, 1, 0] }}
                transition={{ repeat: Infinity, duration: 6 }}
                className="absolute -right-8 -top-6 w-36 h-36 rounded-full bg-gradient-to-tr from-pink-500/40 to-indigo-500/30 blur-3xl"
              />
            </div>
          </motion.div>
        </section>

        {/* CALCULATOR */}
        <section id="calculator" className="mt-16 grid md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-800/60 to-gray-900/40 p-6 rounded-2xl shadow-lg"
          >
            <h4 className="text-xl font-semibold">
              Revenue & missed-calls calculator
            </h4>
            <p className="text-sm text-gray-400 mt-1">
              Drag sliders to model your clinic. Results update live.
            </p>

            <div className="mt-6 space-y-6">
              <Slider
                label="Daily incoming calls"
                min={0}
                max={300}
                value={dailyCalls}
                setValue={setDailyCalls}
                suffix="calls"
              />
              <Slider
                label="% of calls after-hours"
                min={0}
                max={100}
                value={afterHoursPct}
                setValue={setAfterHoursPct}
                suffix="%"
              />
              <Slider
                label="AI answer rate (of after-hours)"
                min={0}
                max={100}
                value={aiAnswerRate}
                setValue={setAiAnswerRate}
                suffix="%"
              />
              <Slider
                label="Conversion rate (calls → appointment)"
                min={0}
                max={100}
                value={conversionRate}
                setValue={setConversionRate}
                suffix="%"
              />
              <Slider
                label="Avg revenue per appointment"
                min={10}
                max={1000}
                value={avgValue}
                setValue={setAvgValue}
                suffix="$"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <StatCard
                title="After-hours calls/day"
                value={results.afterHoursCalls}
              />
              <StatCard title="AI answered/day" value={results.aiAnswered} />
              <StatCard
                title="Extra appts/day"
                value={results.additionalAppointmentsDaily}
              />
              <StatCard
                title="Extra revenue / month"
                value={`$${formatNumber(results.monthlyRevenueIncrease)}`}
                highlight
              />
            </div>
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Maalgah — AI calling agents for dental
          clinics
        </div>
      </footer>
    </div>
  );
}

/* ----------------- Helper components ----------------- */
function Slider({ label, min, max, value, setValue, suffix }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-sm text-gray-300">
          {value}
          {suffix}
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 rounded-lg accent-indigo-500"
      />
    </div>
  );
}

function StatCard({ title, value, highlight }) {
  return (
    <div
      className={`p-4 rounded-lg ${
        highlight
          ? "bg-gradient-to-br from-indigo-700/40 to-pink-700/20"
          : "bg-gray-800"
      }`}
    >
      <div className="text-xs text-gray-400">{title}</div>
      <div className="text-xl font-semibold mt-2">{value}</div>
    </div>
  );
}

function round(v, p = 0) {
  const m = Math.pow(10, p);
  return Math.round(v * m) / m;
}

function formatNumber(n) {
  if (typeof n !== "number") return n;
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}
