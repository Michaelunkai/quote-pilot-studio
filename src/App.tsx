import { useMemo, useState } from 'react';
import { ArrowRight, BadgeDollarSign, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { calculateQuote, formatCurrency, type QuoteInput } from './pricing';
import './styles.css';

const initial: QuoteInput = {
  hourlyRate: 85,
  estimatedHours: 42,
  complexity: 3,
  margin: 35,
  rush: false,
  revisions: 2
};

const presets = [
  { label: 'Landing page', hours: 24, complexity: 2 },
  { label: 'Client portal', hours: 80, complexity: 4 },
  { label: 'Automation sprint', hours: 55, complexity: 5 }
];

function App() {
  const [quote, setQuote] = useState<QuoteInput>(initial);
  const result = useMemo(() => calculateQuote(quote), [quote]);
  const update = (key: keyof QuoteInput, value: number | boolean) => setQuote((prev) => ({ ...prev, [key]: value }));

  return (
    <main>
      <section className="hero">
        <nav><strong>QuotePilot Studio</strong><a href="#calculator">Price a project</a></nav>
        <div className="hero-grid">
          <div>
            <span className="eyebrow"><Sparkles size={16}/> Freelance pricing OS</span>
            <h1>Turn messy client requests into profitable fixed-price proposals.</h1>
            <p>QuotePilot Studio helps consultants and freelancers calculate a defensible floor price, margin, deposit, and delivery plan before a client call ends.</p>
            <div className="cta-row"><a className="button" href="#calculator">Build my quote <ArrowRight size={18}/></a><a className="ghost" href="#monetize">Monetize today</a></div>
          </div>
          <aside className="quote-card" aria-label="Recommended quote summary">
            <span className="pill">{result.tier} package</span>
            <h2>{formatCurrency(result.recommendedPrice)}</h2>
            <p>Recommended fixed price</p>
            <div className="metrics"><span><BadgeDollarSign/> {formatCurrency(result.deposit)} deposit</span><span><Clock/> {result.deliveryDays} days</span></div>
          </aside>
        </div>
      </section>

      <section id="calculator" className="panel">
        <div className="panel-title"><h2>Proposal calculator</h2><p>Adjust assumptions and copy the package details into your client proposal.</p></div>
        <div className="preset-row">{presets.map((preset) => <button key={preset.label} onClick={() => setQuote((prev) => ({ ...prev, estimatedHours: preset.hours, complexity: preset.complexity }))}>{preset.label}</button>)}</div>
        <div className="calculator">
          <div className="controls">
            <Slider label="Hourly rate" value={quote.hourlyRate} min={25} max={250} suffix="/hr" onChange={(v) => update('hourlyRate', v)} />
            <Slider label="Estimated hours" value={quote.estimatedHours} min={5} max={180} suffix=" hrs" onChange={(v) => update('estimatedHours', v)} />
            <Slider label="Complexity" value={quote.complexity} min={1} max={5} suffix="/5" onChange={(v) => update('complexity', v)} />
            <Slider label="Profit margin" value={quote.margin} min={10} max={80} suffix="%" onChange={(v) => update('margin', v)} />
            <Slider label="Revision rounds" value={quote.revisions} min={1} max={6} suffix="" onChange={(v) => update('revisions', v)} />
            <label className="toggle"><input type="checkbox" checked={quote.rush} onChange={(e) => update('rush', e.target.checked)} /> Rush delivery (+25%)</label>
          </div>
          <div className="result-card">
            <h3>{result.tier} proposal</h3>
            <dl><div><dt>Floor price</dt><dd>{formatCurrency(result.floorPrice)}</dd></div><div><dt>Recommended price</dt><dd>{formatCurrency(result.recommendedPrice)}</dd></div><div><dt>Deposit due</dt><dd>{formatCurrency(result.deposit)}</dd></div><div><dt>Delivery window</dt><dd>{result.deliveryDays} days</dd></div></dl>
            <h4>Scope included</h4>
            <ul>{result.scopePoints.map((point) => <li key={point}><CheckCircle2 size={18}/>{point}</li>)}</ul>
          </div>
        </div>
      </section>

      <section id="monetize" className="monetize">
        <h2>Make money with it today</h2>
        <div className="cards"><article><h3>Sell audits</h3><p>Offer a $99 quote review for freelancers who undercharge.</p></article><article><h3>Book consultations</h3><p>Use the calculator as a lead magnet and charge for proposal strategy calls.</p></article><article><h3>Package templates</h3><p>Bundle proposal scripts, pricing sheets, and delivery checklists as a digital product.</p></article></div>
      </section>
    </main>
  );
}

function Slider({ label, value, min, max, suffix, onChange }: { label: string; value: number; min: number; max: number; suffix: string; onChange: (value: number) => void }) {
  return <label className="field"><span>{label}<strong>{value}{suffix}</strong></span><input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} /></label>;
}

export default App;
