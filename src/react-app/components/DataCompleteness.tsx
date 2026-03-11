import { cn } from '@/react-app/lib/utils';
import { CheckCircle2, AlertCircle, Info, ChevronRight } from 'lucide-react';
import type { DataCompletenessMetric } from '@/react-app/data/mockData';

interface DataCompletenessProps {
  metrics: DataCompletenessMetric[];
  score: number;
  mode: 'full' | 'limited';
}

export function DataCompletenessPanel({ metrics, score, mode }: DataCompletenessProps) {
  const scoreColor = score >= 70 ? 'text-success' : score >= 40 ? 'text-warning' : 'text-destructive';
  const scoreBarColor = score >= 70 ? 'bg-success' : score >= 40 ? 'bg-warning' : 'bg-destructive';
  
  const availableCount = metrics.filter(m => m.available).length;
  const missingMetrics = metrics.filter(m => !m.available);

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">Data Completeness</h3>
            <p className="text-sm text-muted-foreground">Patient analysis readiness</p>
          </div>
          <div className="text-right">
            <p className={cn("text-3xl font-bold font-mono", scoreColor)}>
              {score}%
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all duration-500", scoreBarColor)}
            style={{ width: `${score}%` }}
          />
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          {availableCount} of {metrics.length} required fields available
        </p>
      </div>

      {/* Intelligence Mode Banner */}
      {mode === 'limited' && (
        <div className="bg-warning/10 border-b border-warning/20 p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-warning" />
            <div>
              <p className="font-medium text-warning">Limited Intelligence Mode</p>
              <p className="text-xs text-warning/80">
                DDI detection active • Polypharmacy risk calculated
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Available Fields */}
      <div className="p-5 border-b border-border">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Available Data
        </p>
        <div className="space-y-2">
          {metrics.filter(m => m.available).map((metric, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-foreground">{metric.field}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Missing Fields with Prompts */}
      {missingMetrics.length > 0 && (
        <div className="p-5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">
            Required Inputs
          </p>
          <div className="space-y-3">
            {missingMetrics.map((metric, idx) => (
              <div key={idx} className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{metric.field}</p>
                    {metric.prompt && (
                      <p className="text-xs text-muted-foreground mt-1">{metric.prompt}</p>
                    )}
                  </div>
                  <button className="text-primary hover:text-primary/80 transition-colors">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Limitation Notice */}
      <div className="p-5 bg-muted/30 border-t border-border">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            {score >= 70 
              ? 'Full ADR analysis available with current data.'
              : score >= 40 
                ? 'Partial analysis available. Some toxicity assessments require additional data.'
                : 'Laboratory data insufficient for hepatotoxicity/nephrotoxicity evaluation. Drug interaction screening active.'}
          </p>
        </div>
      </div>
    </div>
  );
}

interface SignalStrengthIndicatorProps {
  strength: 'increase' | 'moderate' | 'decrease';
  label: string;
}

export function SignalStrengthIndicator({ strength, label }: SignalStrengthIndicatorProps) {
  const strengthStyles = {
    increase: { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/30' },
    moderate: { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/30' },
    decrease: { bg: 'bg-success/10', text: 'text-success', border: 'border-success/30' }
  };

  const styles = strengthStyles[strength];

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border",
      styles.bg, styles.border
    )}>
      <div className={cn("w-2 h-2 rounded-full", 
        strength === 'increase' ? 'bg-destructive' : 
        strength === 'moderate' ? 'bg-warning' : 'bg-success'
      )} />
      <span className={cn("text-sm font-medium", styles.text)}>{label}</span>
    </div>
  );
}
