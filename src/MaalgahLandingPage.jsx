import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * MaalgahLandingPage.jsx
 * - Single-file React component (Tailwind required)
 * - Paste into src/MaalgahLandingPage.jsx and deploy
 */

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
    const additionalAppointmentsMonthly = additionalAppointmentsDaily * workingDays;
    const monthlyRevenueIncrease = additionalAppointmentsMonthly * avgValue;

    return {
      afterHoursCalls: round(afterHoursCalls),
      aiAnswered: round(aiAnswered),
      additionalAppointmentsDaily: round(additionalAppointmentsDaily, 2),
      additionalAppointmentsMonthly: round(additionalAppointmentsMonthly, 1),
      monthlyRevenueIncrease: round(monthlyRevenueIncrease, 2),
    };
  }, [dailyCalls, afterHoursPct, aiAnswerRate, conversionRate, avgValue]);

  // Animated revenue counter
  const [animatedRevenue, setAnimatedRevenue] = useState(0);
  useEffect(() => {
    let raf;
    const startTime = performance.now();
    const from = animatedRevenue;
    const to = results.monthlyRevenueIncrease;
    const duration = 700;

    const step = (ts) => {
      const t = Math.min(1, (ts - startTime) / duration);
      const eased = easeOutCubic(t);
      const value = Math.round(from + (to - from) * eased);
      setAnimatedRevenue(value);
      if (t < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results.monthlyRevenueIncrease]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#071029] via-[#0b1220] to-[#061021] text-gray-100 antialiased overflow-hidden">
      <FloatingBackground />

      <div className="relative z-10">
        <Header />

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* HERO */}
          <section className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                Turn missed calls into booked dental appointments — automatically
              </h1>
              <p className="text-gray-300 max-w-xl">
                Maalgah’s AI calling agent answers after-hours and missed calls,
                qualifies patients using natural conversations, and books
                appointments directly into your practice software.
              </p>

              <div className="flex gap-4">
                <a
                  href="#calculator"
                  className="inline-flex items-center gap-3 bg-indigo-500 hover:bg-indigo-600 px-5 py-3 rounded-lg font-semibold shadow-lg"
                >
                  Try calculator
                </a>
                <button className="inline-flex items-center gap-2 border border-gray-700 px-5 py-3 rounded-lg">
                  Watch demo
                </button>
              </div>

              <div className="flex gap-4 mt-4">
                <Badge label="Trusted by clinics" value="120+" />
                <Badge label="Avg uplift" value="+18%" />
                <Badge label="24/7" value="Answering" />
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <AgentCard />
            </motion.div>
          </section>

          {/* CALCULATOR */}
          <section id="calculator" className="mt-16 grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-900/60 p-6 rounded-2xl backdrop-blur border border-white/6 shadow-lg"
            >
              <h3 className="text-xl font-semibold">Revenue & missed-call calculator</h3>
              <p className="text-sm text-gray-400 mt-1">
                Drag sliders to model your clinic. Results update live.
              </p>

              <div className="mt-6 space-y-5">
                <Range label="Daily incoming calls" value={dailyCalls} min={0} max={300} onChange={setDailyCalls} />
                <Range label="% of calls after-hours" value={afterHoursPct} min={0} max={100} onChange={setAfterHoursPct} />
                <Range label="AI answer rate (of after-hours)" value={aiAnswerRate} min={0} max={100} onChange={setAiAnswerRate} />
                <Range label="Conversion rate (calls → appointment)" value={conversionRate} min={0} max={100} onChange={setConversionRate} />
                <Range label="Avg revenue per appointment ($)" value={avgValue} min={10} max={1000} onChange={setAvgValue} />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <InfoCard title="After-hours calls/day" value={results.afterHoursCalls} />
                <InfoCard title="AI answered/day" value={results.aiAnswered} />
                <InfoCard title="Extra appts/day" value={results.additionalAppointmentsDaily} />
                <InfoCard title="Extra revenue / month" value={`$${formatNumber(results.monthlyRevenueIncrease)}`} highlight />
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Assumes {workingDays} working days/month. This is an estimate — results vary per clinic.
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 rounded-2xl"
            >
              <div className="bg-gradient-to-br from-indigo-900/20 to-pink-900/10 p-6 rounded-2xl border border-white/4">
                <h4 className="font-semibold">Monthly impact preview</h4>
                <div className="mt-4 text-sm text-gray-300">
                  If your clinic gets <span className="font-semibold">{dailyCalls}</span> calls/day and ~
                  <span className="font-semibold"> {afterHoursPct}%</span> arrive after hours:
                </div>

                <div className="mt-6 bg-gray-900 p-4 rounded-lg">
                  <div className="text-xs text-gray-400">Estimated after-hours calls/day</div>
                  <div className="text-3xl font-bold">{results.afterHoursCalls} <span className="text-sm text-gray-400">calls</span></div>
                  <div className="mt-2 text-xs text-gray-400">
                    AI handles ~{results.aiAnswered} of those → ~{results.additionalAppointmentsMonthly} extra appointments / month
                  </div>

                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-4 flex items-end gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Potential monthly revenue increase</div>
                      <div className="text-2xl font-bold text-indigo-300">${formatNumber(animatedRevenue)}</div>
                    </div>
                    <div className="ml-auto text-xs text-gray-400">(Est.)</div>
                  </motion.div>

                  <div className="mt-6 flex gap-3">
                    <a href="#contact" className="px-4 py-2 bg-indigo-500 rounded-lg font-semibold">Get tailored demo</a>
                    <button className="px-4 py-2 border rounded-lg">Download report</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* INTEGRATIONS */}
          <section id="integrations" className="mt-16">
            <motion.h3 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl font-bold">Integrations</motion.h3>
            <p className="text-sm text-gray-400 mt-2">Connect to practice management software, calendars and messaging.</p>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
              {["Dentrix","Eaglesoft","OpenDental","Curve","Practice-Web","Google Calendar"].map((n) => (
                <motion.div key={n} whileHover={{ scale: 1.03 }} className="bg-gray-800 p-4 rounded-lg text-center text-sm border border-white/4">
                  <div className="text-lg font-semibold">{n}</div>
                  <div className="text-xs text-gray-400 mt-1">API • Zapier • Webhooks</div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section id="contact" className="mt-20 mb-32">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 p-8 rounded-2xl border border-white/6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-bold">Ready to stop losing patients?</h3>
                  <p className="text-gray-400 mt-1">Book a 15-min demo and we’ll show your clinic the uplift using real call data.</p>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="px-6 py-3 bg-indigo-500 rounded-lg font-semibold">Book demo</a>
                  <a href="#" className="px-6 py-3 border rounded-lg">Contact sales</a>
                </div>
              </div>
            </motion.div>
          </section>
        </main>

        <footer className="border-t border-white/4 py-8 text-center text-sm text-gray-400">© {new Date().getFullYear()} Maalgah — AI calling agents for dental clinics</footer>
      </div>
    </div>
  );
}

/* ---------------- components ---------------- */
function Header() {
  return (
    <header className="max-w-7xl mx-auto px-6 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center font-bold text-lg">M</div>
          <div>
            <div className="font-semibold">Maalgah AI</div>
            <div className="text-xs text-gray-400">AI calling agents for dental clinics</div>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 text-sm text-gray-300">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#calculator" className="hover:text-white">Calculator</a>
          <a href="#integrations" className="hover:text-white">Integrations</a>
          <a href="#contact" className="bg-indigo-500 px-4 py-2 rounded-lg text-white">Book demo</a>
        </nav>
      </div>
    </header>
  );
}

function Badge({ label, value }) {
  return (
    <div className="bg-gray-800/50 px-3 py-2 rounded-lg text-sm border border-white/6">
      <div className="text-xs text-gray-400">{label}</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

function AgentCard() {
  return (
    <div className="relative w-full max-w-md">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl ring-1 ring-white/6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-gray-400">Maalgah AI • Virtual receptionist</div>
            <div className="font-semibold">Appointment confirmed</div>
          </div>
          <div className="text-xs text-gray-500">2:14 PM</div>
        </div>

        <div className="bg-black/30 rounded-lg p-4 space-y-2">
          <div className="text-sm">Hi, this is Maalgah. I can book you with Dr. Khan. What day works best?</div>
          <div className="text-xs text-gray-400">Patient: I need next Tuesday</div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
          <div>Confirmed</div>
          <div>Added to calendar</div>
          <div>SMS confirmation</div>
        </div>
      </div>

      <motion.div animate={{ rotate: [0, 2, -2, 1, 0] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute -right-8 -top-6 w-36 h-36 rounded-full bg-gradient-to-tr from-pink-500/40 to-indigo-500/30 blur-3xl" />
    </div>
  );
}

function Range({ label, value, min, max, onChange }) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-sm text-gray-300">{value}</div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg accent-indigo-500"
      />
    </div>
  );
}

function InfoCard({ title, value, highlight }) {
  return (
    <div className={`p-4 rounded-lg ${highlight ? "bg-gradient-to-br from-indigo-700/40 to-pink-700/20" : "bg-gray-800/60"}`}>
      <div className="text-xs text-gray-400">{title}</div>
      <div className="text-xl font-semibold mt-2">{value}</div>
    </div>
  );
}

function FloatingBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <motion.div animate={{ x: [0, 40, 0], y: [0, -20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute -left-24 top-8 w-96 h-96 rounded-full bg-gradient-to-tr from-pink-600/30 to-indigo-500/20 blur-3xl" />
      <motion.div animate={{ x: [0, -30, 0], y: [0, 20, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} className="absolute right-0 top-40 w-80 h-80 rounded-full bg-gradient-to-tr from-cyan-400/10 to-indigo-700/20 blur-3xl" />
    </div>
  );
}

/* ---------- utils ---------- */
function round(v, p = 0) {
  const m = Math.pow(10, p);
  return Math.round(v * m) / m;
}

function formatNumber(n) {
  if (typeof n !== "number") return n;
  return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
