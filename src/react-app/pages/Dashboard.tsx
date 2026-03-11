import { useState } from 'react';
import { Sidebar } from '@/react-app/components/Sidebar';
import { SignalCard, RiskAlertCard, NetworkSignalCard } from '@/react-app/components/SignalCards';
import { DataCompletenessPanel } from '@/react-app/components/DataCompleteness';
import { ADRTrendChart, ADRDistributionChart, SignalStrengthGauge } from '@/react-app/components/Charts';
import { 
  adrSignals, 
  riskAlerts, 
  dataCompletenessMetrics, 
  trendData, 
  networkSignals,
  drugSafetyProfile 
} from '@/react-app/data/mockData';
import { 
  AlertTriangle, 
  Activity, 
  TrendingUp, 
  Users, 
  FileText,
  Download,
  Search,
  Filter,
  RefreshCw,
  Shield,
  Zap
} from 'lucide-react';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  // Calculate completeness score
  const completenessScore = Math.round(
    (dataCompletenessMetrics.filter(m => m.available).length / dataCompletenessMetrics.length) * 100
  );

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="ml-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="px-8 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                {activeSection === 'overview' && 'Dashboard Overview'}
                {activeSection === 'signals' && 'Signal Detection Engine'}
                {activeSection === 'risk' && 'Explainable AI Risk Scoring'}
                {activeSection === 'documents' && 'Clinical Document Processing'}
                {activeSection === 'network' && 'Network Intelligence'}
                {activeSection === 'drug-safety' && 'Drug Safety Intelligence'}
                {activeSection === 'faers' && 'FAERS Analysis'}
                {activeSection === 'analytics' && 'Analytics Dashboard'}
                {activeSection === 'alerts' && 'Alert Center'}
                {activeSection === 'settings' && 'Settings'}
              </h1>
              <p className="text-sm text-muted-foreground">
                Real-time pharmacovigilance monitoring
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors text-sm">
                <RefreshCw className="w-4 h-4" />
                Refresh Data
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors text-sm font-medium">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 gradient-mesh min-h-[calc(100vh-73px)]">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="space-y-8">
              {/* Stats Row */}
              <div className="grid grid-cols-4 gap-6">
                <StatCard 
                  icon={AlertTriangle}
                  label="Active Signals"
                  value="12"
                  change="+3 this week"
                  trend="up"
                  color="destructive"
                />
                <StatCard 
                  icon={Activity}
                  label="Risk Alerts"
                  value="8"
                  change="2 high priority"
                  trend="up"
                  color="warning"
                />
                <StatCard 
                  icon={Users}
                  label="Network Hospitals"
                  value="24"
                  change="6 contributing"
                  trend="stable"
                  color="primary"
                />
                <StatCard 
                  icon={FileText}
                  label="Documents Processed"
                  value="156"
                  change="+12 today"
                  trend="up"
                  color="accent"
                />
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-3 gap-6">
                {/* Signal Detection Panel */}
                <div className="col-span-2 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-foreground">Active Safety Signals</h2>
                    <button 
                      onClick={() => setActiveSection('signals')}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {adrSignals.slice(0, 4).map(signal => (
                      <SignalCard key={signal.id} signal={signal} />
                    ))}
                  </div>
                </div>

                {/* Data Completeness */}
                <div>
                  <DataCompletenessPanel 
                    metrics={dataCompletenessMetrics}
                    score={completenessScore}
                    mode={completenessScore < 50 ? 'limited' : 'full'}
                  />
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-2 gap-6">
                <ADRTrendChart data={trendData} title="ADR Trend Analysis - Drug X" />
                <SignalStrengthGauge prr={3.2} ror={4.1} threshold={2} />
              </div>

              {/* Network Signals */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-foreground">Network Intelligence Alerts</h2>
                  <button 
                    onClick={() => setActiveSection('network')}
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    View Network →
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {networkSignals.map(signal => (
                    <NetworkSignalCard key={signal.id} signal={signal} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Signal Detection Section */}
          {activeSection === 'signals' && (
            <SignalDetectionView signals={adrSignals} trendData={trendData} />
          )}

          {/* Risk Scoring Section */}
          {activeSection === 'risk' && (
            <RiskScoringView alerts={riskAlerts} />
          )}

          {/* Network Intelligence Section */}
          {activeSection === 'network' && (
            <NetworkIntelligenceView signals={networkSignals} />
          )}

          {/* Drug Safety Intelligence Section */}
          {activeSection === 'drug-safety' && (
            <DrugSafetyView profile={drugSafetyProfile} trendData={trendData} />
          )}

          {/* Documents Section */}
          {activeSection === 'documents' && (
            <DocumentProcessingView />
          )}

          {/* FAERS Analysis Section */}
          {activeSection === 'faers' && (
            <FAERSAnalysisView trendData={trendData} />
          )}

          {/* Placeholder sections */}
          {(activeSection === 'analytics' || activeSection === 'alerts' || activeSection === 'settings') && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </h2>
                <p className="text-muted-foreground">This section is coming soon.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: 'primary' | 'destructive' | 'warning' | 'accent';
}

function StatCard({ icon: Icon, label, value, change, trend, color }: StatCardProps) {
  const colorStyles = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    accent: 'bg-accent/10 text-accent border-accent/20'
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-lg border ${colorStyles[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend === 'up' && <TrendingUp className="w-4 h-4 text-destructive" />}
      </div>
      <p className="text-3xl font-bold text-foreground font-mono">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
      <p className="text-xs text-muted-foreground mt-2">{change}</p>
    </div>
  );
}

// Signal Detection View
function SignalDetectionView({ signals, trendData: signalTrendData }: { signals: typeof adrSignals; trendData: typeof import('@/react-app/data/mockData').trendData }) {
  return (
    <div className="space-y-8">
      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search signals by drug name or ADR type..."
            className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground hover:bg-secondary/80 transition-colors">
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Trend Chart */}
      <ADRTrendChart data={signalTrendData} title="FAERS Signal Trends - All Active Signals" />

      {/* Signals Grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Detected Safety Signals</h2>
        <div className="grid grid-cols-3 gap-4">
          {signals.map(signal => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Risk Scoring View
function RiskScoringView({ alerts }: { alerts: typeof riskAlerts }) {
  return (
    <div className="space-y-8">
      {/* AI Engine Status */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center glow-primary">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-foreground">Explainable AI Risk Engine</h2>
            <p className="text-sm text-muted-foreground">
              Random Forest + Clinical Logic • 94.2% Accuracy • Last trained: 2024-12-15
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-sm text-success">Active</span>
          </div>
        </div>
      </div>

      {/* Risk Level Legend */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-destructive" />
          <span className="text-sm text-foreground">High Risk (&gt;70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-warning" />
          <span className="text-sm text-foreground">Moderate Risk (40-70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success" />
          <span className="text-sm text-foreground">Low Risk (&lt;40%)</span>
        </div>
      </div>

      {/* Alerts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {alerts.map(alert => (
          <RiskAlertCard key={alert.id} alert={alert} />
        ))}
      </div>
    </div>
  );
}

// Network Intelligence View
function NetworkIntelligenceView({ signals }: { signals: typeof networkSignals }) {
  return (
    <div className="space-y-8">
      {/* Network Status */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Collaborative Network Status</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time signal aggregation from participating institutions
            </p>
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground">Hospitals</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-xs text-muted-foreground">Signals Shared</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <p className="text-2xl font-bold text-primary">3</p>
              <p className="text-xs text-muted-foreground">Active Alerts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Network Flow Diagram */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-6">Signal Propagation Flow</h3>
        <div className="flex items-center justify-between">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl font-bold text-primary">A</span>
            </div>
            <p className="text-sm text-foreground">Hospital A</p>
            <p className="text-xs text-muted-foreground">Detects signal</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full h-px bg-gradient-to-r from-primary to-accent relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-3 py-1 rounded border border-border">
                <p className="text-xs text-muted-foreground">Validates pattern</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {['B', 'C', 'D'].map(letter => (
              <div key={letter} className="text-center">
                <div className="w-14 h-14 bg-secondary border border-border rounded-xl flex items-center justify-center mx-auto mb-2">
                  <span className="text-lg font-bold text-foreground">{letter}</span>
                </div>
                <p className="text-xs text-muted-foreground">Receives alert</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Network Signals */}
      <div>
        <h3 className="font-semibold text-foreground mb-4">Network-Level Safety Signals</h3>
        <div className="grid grid-cols-3 gap-4">
          {signals.map(signal => (
            <NetworkSignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Drug Safety View
function DrugSafetyView({ profile, trendData: safeTrendData }: { profile: typeof drugSafetyProfile; trendData: typeof import('@/react-app/data/mockData').trendData }) {
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text"
            placeholder="Search drug for safety analysis..."
            className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <button className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Analyze
        </button>
      </div>

      {/* Drug Profile Card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{profile.drug}</h2>
            <p className="text-sm text-muted-foreground">Post-marketing surveillance analysis</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-warning/10 border border-warning/30 rounded-full">
            <div className="w-2 h-2 bg-warning rounded-full" />
            <span className="text-sm font-medium text-warning">{profile.signalStatus}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-secondary/50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-foreground font-mono">{profile.totalReports.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total FAERS Reports</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-primary font-mono">{profile.topADRs.length}</p>
            <p className="text-sm text-muted-foreground">Distinct ADRs Identified</p>
          </div>
          <div className="bg-secondary/50 rounded-lg p-4 text-center">
            <p className="text-3xl font-bold text-foreground font-mono">{profile.lastReviewDate}</p>
            <p className="text-sm text-muted-foreground">Last Review Date</p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <ADRTrendChart data={safeTrendData} title={`Reporting Trends - ${profile.drug}`} />
        <ADRDistributionChart data={profile.topADRs} />
      </div>

      {/* Download Section */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Generate Safety Reports</h3>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Safety Summary (PDF)
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            FAERS Data Export (CSV)
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Regulatory Report
          </button>
        </div>
      </div>
    </div>
  );
}

// Document Processing View
function DocumentProcessingView() {
  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <div className="bg-card border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Clinical Documents</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop PDFs, scanned reports, or medical documents
        </p>
        <p className="text-xs text-muted-foreground">
          Supports: PDF, PNG, JPG • PyPDF2 + Tesseract OCR processing
        </p>
      </div>

      {/* Processing Pipeline */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-6">Document Processing Pipeline</h3>
        <div className="flex items-center justify-between">
          {['Upload', 'Text Extraction', 'NLP Analysis', 'Entity Mapping', 'ADR Detection'].map((step, idx) => (
            <div key={step} className="flex items-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-sm font-bold text-primary">{idx + 1}</span>
                </div>
                <p className="text-xs text-muted-foreground">{step}</p>
              </div>
              {idx < 4 && (
                <div className="w-16 h-px bg-border mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sample Extracted Data */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Extracted Drug List</h3>
          <div className="space-y-2">
            {['Amoxicillin 500mg TID', 'Metformin 1000mg BID', 'Lisinopril 10mg QD', 'Atorvastatin 20mg QD'].map(drug => (
              <div key={drug} className="flex items-center gap-2 p-2 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm">{drug}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold text-foreground mb-4">Abnormal Lab Values</h3>
          <div className="space-y-2">
            {[
              { name: 'ALT', value: '180 U/L', status: 'high' },
              { name: 'Creatinine', value: '1.8 mg/dL', status: 'high' },
              { name: 'Hemoglobin', value: '11.2 g/dL', status: 'low' }
            ].map(lab => (
              <div key={lab.name} className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg">
                <span className="text-sm">{lab.name}</span>
                <span className={`text-sm font-mono ${lab.status === 'high' ? 'text-destructive' : 'text-warning'}`}>
                  {lab.value} ↑
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// FAERS Analysis View
function FAERSAnalysisView({ trendData: faersTrendData }: { trendData: typeof import('@/react-app/data/mockData').trendData }) {
  return (
    <div className="space-y-8">
      {/* FAERS Data Status */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">FAERS Dataset Status</h2>
            <p className="text-sm text-muted-foreground mt-1">
              FDA Adverse Event Reporting System quarterly data
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">Latest Quarter: 2024 Q4</p>
              <p className="text-xs text-muted-foreground">Last updated: Dec 15, 2024</p>
            </div>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Ingest New Data
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Calculation */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm text-muted-foreground mb-2">PRR Calculation</h3>
          <p className="text-2xl font-bold text-foreground mb-2">Proportional Reporting Ratio</p>
          <div className="bg-secondary/50 rounded-lg p-3 font-mono text-sm">
            PRR = (a/a+b) / (c/c+d)
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Signal detected when PRR ≥ 2
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm text-muted-foreground mb-2">ROR Calculation</h3>
          <p className="text-2xl font-bold text-foreground mb-2">Reporting Odds Ratio</p>
          <div className="bg-secondary/50 rounded-lg p-3 font-mono text-sm">
            ROR = (a×d) / (b×c)
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            95% CI lower bound &gt; 1 indicates signal
          </p>
        </div>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-sm text-muted-foreground mb-2">Case Frequency</h3>
          <p className="text-2xl font-bold text-foreground mb-2">Trend Analysis</p>
          <div className="bg-secondary/50 rounded-lg p-3 font-mono text-sm">
            Δ cases / quarter
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Monitors reporting velocity changes
          </p>
        </div>
      </div>

      {/* Trend Chart */}
      <ADRTrendChart data={faersTrendData} title="FAERS Quarterly Signal Analysis" />

      {/* Data Pipeline */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Data Processing Pipeline</h3>
        <div className="grid grid-cols-5 gap-4">
          {[
            { step: 'Ingest', desc: 'CSV import' },
            { step: 'Clean', desc: 'Standardize data' },
            { step: 'Calculate', desc: 'PRR/ROR metrics' },
            { step: 'Store', desc: 'Database persist' },
            { step: 'Alert', desc: 'Threshold check' }
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-full h-2 bg-primary/20 rounded-full mb-3 overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-pulse" style={{ width: '100%' }} />
              </div>
              <p className="text-sm font-medium text-foreground">{item.step}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
