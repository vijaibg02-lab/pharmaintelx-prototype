import { cn } from '@/react-app/lib/utils';
import { AlertTriangle, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
import type { ADRSignal } from '@/react-app/data/mockData';

interface SignalCardProps {
  signal: ADRSignal;
}

export function SignalCard({ signal }: SignalCardProps) {
  const strengthColors = {
    high: 'bg-destructive/10 border-destructive/30 text-destructive',
    moderate: 'bg-warning/10 border-warning/30 text-warning',
    low: 'bg-success/10 border-success/30 text-success'
  };

  const strengthLabels = {
    high: 'High Risk',
    moderate: 'Moderate',
    low: 'Low Risk'
  };

  const glowClass = {
    high: 'glow-destructive',
    moderate: 'glow-warning',
    low: ''
  };

  return (
    <div className={cn(
      "bg-card border border-border rounded-xl p-5 transition-all duration-300 hover:border-primary/30",
      signal.signalStrength === 'high' && glowClass.high
    )}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground text-lg">{signal.drug}</h3>
          <p className="text-sm text-muted-foreground">{signal.adrType}</p>
        </div>
        <span className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium border",
          strengthColors[signal.signalStrength]
        )}>
          {strengthLabels[signal.signalStrength]}
        </span>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-secondary/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">PRR</p>
          <p className="text-xl font-bold text-foreground font-mono">{signal.prr.toFixed(1)}</p>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">ROR</p>
          <p className="text-xl font-bold text-foreground font-mono">{signal.ror.toFixed(1)}</p>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Cases reported</span>
          <span className="font-medium text-foreground">{signal.casesReported}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Quarters detected</span>
          <span className="font-medium text-foreground">{signal.quartersDetected}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Last updated</span>
          <span className="font-medium text-foreground">{signal.lastUpdated}</span>
        </div>
      </div>

      {/* Recommendation */}
      <div className={cn(
        "mt-4 p-3 rounded-lg flex items-start gap-2",
        signal.signalStrength === 'high' ? 'bg-destructive/10' : 
        signal.signalStrength === 'moderate' ? 'bg-warning/10' : 'bg-success/10'
      )}>
        <AlertTriangle className={cn(
          "w-4 h-4 mt-0.5 flex-shrink-0",
          signal.signalStrength === 'high' ? 'text-destructive' : 
          signal.signalStrength === 'moderate' ? 'text-warning' : 'text-success'
        )} />
        <p className="text-sm">{signal.recommendation}</p>
      </div>
    </div>
  );
}

interface RiskAlertCardProps {
  alert: {
    id: string;
    drug: string;
    labChange: string;
    knownADR: string;
    probability: number;
    riskLevel: 'high' | 'moderate' | 'low';
    recommendedAction: string;
    explanation: string;
  };
}

export function RiskAlertCard({ alert }: RiskAlertCardProps) {
  const riskColors = {
    high: { bg: 'bg-destructive', text: 'text-destructive', border: 'border-destructive/30' },
    moderate: { bg: 'bg-warning', text: 'text-warning', border: 'border-warning/30' },
    low: { bg: 'bg-success', text: 'text-success', border: 'border-success/30' }
  };

  const colors = riskColors[alert.riskLevel];
  const probabilityPercent = Math.round(alert.probability * 100);

  return (
    <div className={cn(
      "bg-card border rounded-xl p-5 transition-all duration-300 hover:border-primary/30",
      colors.border
    )}>
      {/* Risk Level Indicator Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className={cn("w-1.5 h-12 rounded-full", colors.bg)} />
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{alert.drug}</h3>
          <p className="text-sm text-muted-foreground">{alert.knownADR}</p>
        </div>
        <div className="text-right">
          <p className={cn("text-2xl font-bold font-mono", colors.text)}>
            {probabilityPercent}%
          </p>
          <p className="text-xs text-muted-foreground">Probability</p>
        </div>
      </div>

      {/* Lab Change Badge */}
      <div className="bg-secondary/50 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-destructive" />
          <span className="text-sm font-medium">{alert.labChange}</span>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-muted/30 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            {alert.explanation}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className={cn(
        "p-3 rounded-lg text-center font-medium text-sm",
        alert.riskLevel === 'high' ? 'bg-destructive/20 text-destructive' :
        alert.riskLevel === 'moderate' ? 'bg-warning/20 text-warning' :
        'bg-success/20 text-success'
      )}>
        {alert.recommendedAction}
      </div>
    </div>
  );
}

interface NetworkSignalCardProps {
  signal: {
    id: string;
    drug: string;
    drugCombination?: string;
    signal: string;
    hospitalCount: number;
    totalCases: number;
    signalStrength: number;
    trend: 'increasing' | 'stable' | 'decreasing';
  };
}

export function NetworkSignalCard({ signal }: NetworkSignalCardProps) {
  const trendIcons = {
    increasing: <TrendingUp className="w-4 h-4 text-destructive" />,
    stable: <Minus className="w-4 h-4 text-warning" />,
    decreasing: <TrendingDown className="w-4 h-4 text-success" />
  };

  const trendColors = {
    increasing: 'text-destructive',
    stable: 'text-warning',
    decreasing: 'text-success'
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-foreground">
            {signal.drug}
            {signal.drugCombination && (
              <span className="text-muted-foreground"> + {signal.drugCombination}</span>
            )}
          </h3>
          <p className="text-sm text-primary">{signal.signal}</p>
        </div>
        <div className="flex items-center gap-1">
          {trendIcons[signal.trend]}
          <span className={cn("text-xs font-medium capitalize", trendColors[signal.trend])}>
            {signal.trend}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-2 bg-secondary/50 rounded-lg">
          <p className="text-lg font-bold text-foreground">{signal.hospitalCount}</p>
          <p className="text-xs text-muted-foreground">Hospitals</p>
        </div>
        <div className="text-center p-2 bg-secondary/50 rounded-lg">
          <p className="text-lg font-bold text-foreground">{signal.totalCases}</p>
          <p className="text-xs text-muted-foreground">Cases</p>
        </div>
        <div className="text-center p-2 bg-primary/10 rounded-lg">
          <p className="text-lg font-bold text-primary font-mono">{signal.signalStrength.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground">PRR</p>
        </div>
      </div>
    </div>
  );
}
