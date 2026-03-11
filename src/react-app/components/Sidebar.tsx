import { 
  Activity, 
  Shield, 
  FileText, 
  Network, 
  BarChart3, 
  Settings,
  Bell,
  Database,
  Brain,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/react-app/lib/utils';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: Activity },
  { id: 'signals', label: 'Signal Detection', icon: AlertTriangle },
  { id: 'risk', label: 'Risk Scoring', icon: Brain },
  { id: 'documents', label: 'Document Processing', icon: FileText },
  { id: 'network', label: 'Network Intelligence', icon: Network },
  { id: 'drug-safety', label: 'Drug Safety Intel', icon: Shield },
  { id: 'faers', label: 'FAERS Analysis', icon: Database },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const bottomNavItems = [
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center glow-primary">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground tracking-tight">PharmaVigil</h1>
            <p className="text-xs text-muted-foreground">Intelligence Platform</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 px-3">
          Modules
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive && "text-primary")} />
              <span>{item.label}</span>
              {item.id === 'signals' && (
                <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-1.5 py-0.5 rounded-full font-medium">
                  3
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-border space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
              {item.id === 'alerts' && (
                <span className="ml-auto w-2 h-2 bg-destructive rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>

      {/* Security Badge */}
      <div className="p-4 border-t border-border">
        <div className="bg-secondary/50 rounded-lg p-3 border border-border">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-muted-foreground">AES-256 Encrypted</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">Audit trail active</p>
        </div>
      </div>
    </aside>
  );
}
