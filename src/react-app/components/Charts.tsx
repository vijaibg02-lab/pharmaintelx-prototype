import { Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import type { TrendDataPoint } from '@/react-app/data/mockData';

interface ADRTrendChartProps {
  data: TrendDataPoint[];
  title: string;
}

export function ADRTrendChart({ data, title }: ADRTrendChartProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="casesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(173 80% 40%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(173 80% 40%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="prrGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(262 80% 55%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(262 80% 55%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 15% 20%)" />
            <XAxis 
              dataKey="quarter" 
              stroke="hsl(215 15% 55%)" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              yAxisId="left"
              stroke="hsl(215 15% 55%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="hsl(215 15% 55%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(222 18% 10%)', 
                border: '1px solid hsl(222 15% 20%)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              labelStyle={{ color: 'hsl(210 20% 95%)' }}
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="cases" 
              stroke="hsl(173 80% 40%)" 
              fillOpacity={1} 
              fill="url(#casesGradient)"
              name="Cases"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="prr" 
              stroke="hsl(262 80% 55%)" 
              strokeWidth={2}
              dot={{ fill: 'hsl(262 80% 55%)', strokeWidth: 0 }}
              name="PRR"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Cases Reported</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <span className="text-xs text-muted-foreground">PRR Score</span>
        </div>
      </div>
    </div>
  );
}

interface ADRDistributionChartProps {
  data: { adr: string; count: number; percentage: number }[];
}

export function ADRDistributionChart({ data }: ADRDistributionChartProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold text-foreground mb-4">Top Adverse Reactions</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 15% 20%)" horizontal={true} vertical={false} />
            <XAxis 
              type="number" 
              stroke="hsl(215 15% 55%)" 
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              dataKey="adr" 
              type="category"
              stroke="hsl(215 15% 55%)" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={100}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(222 18% 10%)', 
                border: '1px solid hsl(222 15% 20%)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value) => [`${value} reports`, 'Count']}
            />
            <Bar 
              dataKey="count" 
              fill="hsl(173 80% 40%)" 
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

interface SignalStrengthGaugeProps {
  prr: number;
  ror: number;
  threshold: number;
}

export function SignalStrengthGauge({ prr, ror, threshold }: SignalStrengthGaugeProps) {
  const prrPercent = Math.min((prr / 5) * 100, 100);
  const rorPercent = Math.min((ror / 5) * 100, 100);
  const thresholdPercent = (threshold / 5) * 100;

  const getColorClass = (value: number) => {
    if (value >= 3) return 'bg-destructive';
    if (value >= 2) return 'bg-warning';
    return 'bg-success';
  };

  return (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold text-foreground mb-4">Signal Strength Metrics</h3>
      
      <div className="space-y-6">
        {/* PRR Gauge */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Proportional Reporting Ratio (PRR)</span>
            <span className="text-sm font-mono font-bold text-foreground">{prr.toFixed(2)}</span>
          </div>
          <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`absolute h-full rounded-full transition-all duration-500 ${getColorClass(prr)}`}
              style={{ width: `${prrPercent}%` }}
            />
            <div 
              className="absolute h-full w-0.5 bg-foreground/50"
              style={{ left: `${thresholdPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">0</span>
            <span className="text-xs text-muted-foreground">Threshold: {threshold}</span>
            <span className="text-xs text-muted-foreground">5+</span>
          </div>
        </div>

        {/* ROR Gauge */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">Reporting Odds Ratio (ROR)</span>
            <span className="text-sm font-mono font-bold text-foreground">{ror.toFixed(2)}</span>
          </div>
          <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`absolute h-full rounded-full transition-all duration-500 ${getColorClass(ror)}`}
              style={{ width: `${rorPercent}%` }}
            />
            <div 
              className="absolute h-full w-0.5 bg-foreground/50"
              style={{ left: `${thresholdPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">0</span>
            <span className="text-xs text-muted-foreground">Threshold: {threshold}</span>
            <span className="text-xs text-muted-foreground">5+</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-success" />
            <span className="text-muted-foreground">Low (&lt;2)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-warning" />
            <span className="text-muted-foreground">Moderate (2-3)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive" />
            <span className="text-muted-foreground">High (&gt;3)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
