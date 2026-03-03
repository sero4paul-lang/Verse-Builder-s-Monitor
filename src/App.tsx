import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Search,
  Filter,
  MoreVertical,
  ArrowUpRight,
  Activity
} from 'lucide-react';
import { CommunityApp, DashboardStats, AppStatus } from './types';

const MOCK_APPS: CommunityApp[] = [
  {
    id: '1',
    name: 'Verse Tasks Hub',
    builder: '@raira',
    stage: 'MVP',
    progress: 70,
    lastUpdate: '3 days ago',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Crypto Notes',
    builder: '@devmax',
    stage: 'Idea',
    progress: 20,
    lastUpdate: '10 days ago',
    status: 'Slow',
  },
  {
    id: '3',
    name: 'Wallet Tracker',
    builder: '@bitqueen',
    stage: 'Beta',
    progress: 85,
    lastUpdate: '18 days ago',
    status: 'Inactive',
  },
  {
    id: '4',
    name: 'DeFi Dashboard',
    builder: '@oxalpha',
    stage: 'Production',
    progress: 100,
    lastUpdate: '1 day ago',
    status: 'Completed',
  },
  {
    id: '5',
    name: 'NFT Minter',
    builder: '@pixelart',
    stage: 'Alpha',
    progress: 45,
    lastUpdate: '5 days ago',
    status: 'Active',
  },
  {
    id: '6',
    name: 'DAO Governance',
    builder: '@gov_node',
    stage: 'MVP',
    progress: 60,
    lastUpdate: '2 days ago',
    status: 'Active',
  }
];

const STATS: DashboardStats = {
  totalApps: 12,
  active: 7,
  stalled: 3,
  completed: 2,
};

const StatusBadge = ({ status }: { status: AppStatus }) => {
  const styles = {
    Active: 'text-brand-success bg-brand-success/10',
    Slow: 'text-brand-warning bg-brand-warning/10',
    Inactive: 'text-brand-error bg-brand-error/10',
    Completed: 'text-indigo-400 bg-indigo-400/10',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredApps = MOCK_APPS.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.builder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-2">
            Community App Monitor
          </h1>
          <p className="text-blue-200/60 text-lg">
            Tracking the heartbeat of our builder ecosystem
          </p>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        {[
          { label: 'Total Apps', value: STATS.totalApps, icon: LayoutDashboard, color: 'text-blue-400' },
          { label: 'Active', value: STATS.active, icon: Activity, color: 'text-brand-success' },
          { label: 'Stalled', value: STATS.stalled, icon: Clock, color: 'text-brand-warning' },
          { label: 'Completed', value: STATS.completed, icon: CheckCircle2, color: 'text-indigo-400' },
        ].map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-medium text-blue-200/50 uppercase tracking-wider mb-1">
                {stat.label}
              </p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="glass-card overflow-hidden">
        {/* Toolbar */}
        <div className="px-6 py-4 border-bottom border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
            <input
              type="text"
              placeholder="Search apps or builders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-brand-accent/50 transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
              <Filter size={18} />
            </button>
            <button className="px-4 py-2 rounded-xl bg-brand-accent text-white text-sm font-medium hover:bg-brand-accent/80 transition-all flex items-center gap-2">
              <Users size={16} />
              Add App
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-xs font-semibold text-white/40 uppercase tracking-wider">
                <th className="px-6 py-4">App Name</th>
                <th className="px-6 py-4">Builder</th>
                <th className="px-6 py-4">Stage</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Last Update</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <AnimatePresence mode="popLayout">
                {filteredApps.map((app) => (
                  <motion.tr
                    key={app.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold">
                          {app.name.charAt(0)}
                        </div>
                        <span className="font-semibold text-white group-hover:text-brand-accent transition-colors">
                          {app.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-blue-200/70 font-mono text-sm">
                      {app.builder}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-white/80">{app.stage}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-full max-w-[120px]">
                        <div className="flex justify-between text-[10px] text-white/40 mb-1">
                          <span>{app.progress}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${app.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-brand-accent"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/60">
                      {app.lastUpdate}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-white/40 hover:text-white transition-colors">
                          <ExternalLink size={16} />
                        </button>
                        <button className="p-2 text-white/40 hover:text-white transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredApps.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-white/40">No apps found matching your search.</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/30 text-sm">
        <p>© 2026 Community Builder Network</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">Discord</a>
          <a href="#" className="hover:text-white transition-colors">GitHub</a>
        </div>
      </footer>
    </div>
  );
}
