import React, { useState, useMemo } from 'react';
import { View, Asset, CurrencyCode } from './types';
import { MOCK_TRANSACTIONS, INITIAL_ASSETS } from './constants';
import { Oracle } from './components/Oracle';
import { Button } from './components/Button';
import { CryptoCard } from './components/CryptoCard';
import { Notifications } from './components/Notification';
import { useNotification } from './hooks/useNotification';
import { 
  LayoutDashboard, 
  Send as SendIcon, 
  ArrowDownLeft, 
  History, 
  Bot, 
  Wallet,
  Copy,
  Check,
  Menu,
  X,
  CreditCard,
  ChevronRight,
  Bitcoin,
  Ghost,
  DollarSign,
  Layers,
  ArrowRight,
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  Share2,
  Gift,
  User,
  Shield,
  Mail,
  Smartphone,
  Fingerprint,
  LifeBuoy,
  MessageSquare,
  Lock
} from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Notifications
  const { notifications, removeNotification, success, error, warning, info } = useNotification();
  
  // State
  const [hasCard, setHasCard] = useState(false);
  const [selectedAssetCode, setSelectedAssetCode] = useState<CurrencyCode>('BTC');

  // Referral State (Mock)
  const referralLink = "obsidian.protocol/ref/supremo-mestre";
  const referralEarnings = 35.00; // 7 invites
  const referralLimit = 100.00;
  const referralProgress = (referralEarnings / referralLimit) * 100;

  // Computed
  const assets = INITIAL_ASSETS;
  const totalBalanceUSD = assets.reduce((acc, asset) => acc + (asset.balance * asset.price), 0);
  
  const selectedAsset = useMemo(() => 
    assets.find(a => a.code === selectedAssetCode) || assets[0]
  , [selectedAssetCode]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getAssetIcon = (code: CurrencyCode) => {
    switch(code) {
      case 'BTC': return <Bitcoin size={20} className="text-orange-500" />;
      case 'ETH': return <Layers size={20} className="text-indigo-400" />;
      case 'XMR': return <Ghost size={20} className="text-gray-400" />;
      case 'USDT': return <DollarSign size={20} className="text-emerald-400" />;
      case 'USDC': return <DollarSign size={20} className="text-blue-400" />;
      default: return <Wallet size={20} />;
    }
  };

  const getAddress = (code: CurrencyCode) => {
     switch(code) {
       case 'BTC': return 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh';
       case 'ETH': case 'USDT': case 'USDC': return '0x71C7656EC7ab88b098defB751B7401B5f6d8976F';
       case 'XMR': return '44AFFq5kSiGBoZ4NMDwYtN1800291919293...';
     }
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsSidebarOpen(false);
      }}
      className={`relative w-full flex items-center gap-4 p-4 text-sm font-medium transition-all duration-300 group rounded-xl my-1 ${
        currentView === view 
          ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      <Icon size={20} className={currentView === view ? "text-black" : "text-gray-400 group-hover:text-white"} />
      <span className="tracking-wide">{label}</span>
      {currentView === view && (
        <ChevronRight size={14} className="ml-auto opacity-50" />
      )}
    </button>
  );

  const AssetSelector = ({ onSelect, selected }: { onSelect: (code: CurrencyCode) => void, selected: CurrencyCode }) => (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {assets.map((asset) => (
        <button
          key={asset.code}
          onClick={() => onSelect(asset.code)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
            selected === asset.code 
              ? 'bg-white text-black border-white' 
              : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10'
          }`}
        >
          {getAssetIcon(asset.code)}
          <span className="font-bold text-xs">{asset.code}</span>
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden selection:bg-white selection:text-black">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar with Glassmorphism */}
      <aside className={`
        fixed md:relative z-50 w-72 h-full glass-panel border-r-0 border-r-white/5 transform transition-transform duration-500 ease-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-bold text-xl rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              <Wallet size={20} />
            </div>
            <div>
              <span className="font-bold tracking-[0.15em] text-lg block leading-none">OBSIDIAN</span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest">Protocol v11</span>
            </div>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-white hover:rotate-90 transition-transform">
            <X size={24} />
          </button>
        </div>
        
        <nav className="px-4 py-2 space-y-1">
          <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4 mb-2">Menu Principal</div>
          <NavItem view={View.DASHBOARD} icon={LayoutDashboard} label="Portfólio" />
          <NavItem view={View.CARD} icon={CreditCard} label="Cartão Visa" />
          <NavItem view={View.ORACLE} icon={Bot} label="Oráculo IA" />
          <NavItem view={View.REFERRAL} icon={Users} label="Convide e Ganhe" />
          
          <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4 mb-2 mt-8">Operações</div>
          <NavItem view={View.SEND} icon={SendIcon} label="Enviar" />
          <NavItem view={View.RECEIVE} icon={ArrowDownLeft} label="Receber" />
          <NavItem view={View.HISTORY} icon={History} label="Histórico" />
          
          <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest px-4 mb-2 mt-8">Configurações</div>
          <NavItem view={View.PROFILE} icon={User} label="Identidade" />
        </nav>

        <div className="absolute bottom-0 w-full p-8 border-t border-white/5 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
            <div className="text-[10px] text-gray-400 font-mono">
              NODES: <span className="text-white">5/5</span><br/>
              REDE: MULTI-CHAIN
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header (Mobile) */}
        <header className="md:hidden p-4 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-white/5 sticky top-0 z-30">
          <div className="font-bold tracking-widest">OBSIDIAN</div>
          <button onClick={toggleSidebar} className="text-white">
            <Menu size={24} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-7xl mx-auto w-full scroll-smooth">
          
          {currentView === View.DASHBOARD && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <header className="relative mb-8">
                <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl pointer-events-none"></div>
                
                <h1 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2">Patrimônio Global</h1>
                <div className="flex items-baseline gap-4">
                  <span className="text-5xl md:text-7xl font-bold tracking-tighter text-gradient-metal drop-shadow-2xl">
                    $ {totalBalanceUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-xl text-gray-600 font-light">USD</span>
                </div>
              </header>

              {/* HORIZONTAL ASSET SCROLL - COMPACT MODE */}
              <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center justify-between">
                   Custódia Digital
                   <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded border border-white/5">SCROLLABLE</span>
                </h3>
                <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin snap-x">
                   {assets.map((asset) => (
                      <div 
                        key={asset.code} 
                        className="min-w-[220px] md:min-w-[240px] p-5 rounded-2xl glass-panel border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 group snap-center flex flex-col justify-between h-36 relative overflow-hidden"
                      >
                         <div className="flex justify-between items-start z-10">
                            <div className="flex flex-col">
                               <div className="flex items-center gap-2 mb-1">
                                  {getAssetIcon(asset.code)}
                                  <span className="font-bold text-sm tracking-wide">{asset.name}</span>
                               </div>
                               <span className="text-[10px] text-gray-500">{asset.network}</span>
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded border ${asset.change24h >= 0 ? 'border-emerald-500/20 text-emerald-400 bg-emerald-500/10' : 'border-red-500/20 text-red-400 bg-red-500/10'}`}>
                               {asset.change24h >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                               {Math.abs(asset.change24h)}%
                            </div>
                         </div>

                         <div className="z-10">
                            <div className="font-mono text-xl font-bold text-white tracking-tight">
                               {(asset.balance * asset.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </div>
                            <div className="text-xs text-gray-500 font-mono mt-1">
                               {asset.balance.toLocaleString('en-US', { maximumFractionDigits: 6 })} {asset.code}
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
              </div>

              {/* GRID: ACTIONS & HISTORY */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 
                 {/* LEFT COL: ACTIONS */}
                 <div className="lg:col-span-1 space-y-4">
                    <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2">Comandos</h2>
                    <Button fullWidth onClick={() => setCurrentView(View.SEND)} className="h-20 shadow-lg border border-white/10 hover:border-white/30 group bg-gradient-to-r from-white/10 to-transparent">
                      <div className="flex items-center w-full px-2">
                        <div className="p-3 bg-white text-black rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:scale-110 transition-transform"><SendIcon size={20} /></div>
                        <div className="ml-4 text-left">
                          <span className="block font-bold text-lg">ENVIAR</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Transferência</span>
                        </div>
                        <ChevronRight className="ml-auto text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
                      </div>
                    </Button>
                    <Button fullWidth variant="secondary" onClick={() => setCurrentView(View.RECEIVE)} className="h-20 group">
                       <div className="flex items-center w-full px-2">
                        <div className="p-3 bg-white/10 text-white rounded-lg border border-white/10 group-hover:bg-white group-hover:text-black transition-all"><ArrowDownLeft size={20} /></div>
                        <div className="ml-4 text-left">
                          <span className="block font-bold text-lg">RECEBER</span>
                          <span className="text-[10px] text-gray-400 uppercase tracking-wider">Depósito</span>
                        </div>
                         <ChevronRight className="ml-auto text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
                      </div>
                    </Button>
                 </div>

                 {/* RIGHT COL: HISTORY */}
                 <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-sm font-bold tracking-widest text-gray-500 uppercase flex items-center gap-2">
                        <History size={14} />
                        Atividades
                      </h2>
                      <button onClick={() => setCurrentView(View.HISTORY)} className="text-[10px] uppercase tracking-widest text-emerald-400 hover:text-emerald-300 transition-colors">
                        Ver Tudo
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {MOCK_TRANSACTIONS.slice(0, 4).map((tx) => (
                        <div key={tx.id} className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 flex justify-between items-center transition-all duration-300 group cursor-pointer">
                          <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-lg ${tx.type === 'received' ? 'bg-white/10 text-emerald-400' : 'bg-white/5 text-gray-400'}`}>
                              {tx.type === 'received' ? <ArrowDownLeft size={16} /> : <SendIcon size={16} />}
                            </div>
                            <div>
                              <div className="font-bold text-sm text-gray-200 group-hover:text-white transition-colors">
                                 {tx.type === 'received' ? 'Recebido' : 'Enviado'}
                              </div>
                              <div className="text-[10px] text-gray-500 font-mono mt-0.5">{tx.date}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-mono font-bold text-sm ${tx.type === 'received' ? 'text-emerald-400' : 'text-white'}`}>
                              {tx.type === 'received' ? '+' : '-'}{tx.amount} {tx.currency}
                            </div>
                            <div className="text-[10px] text-gray-600 font-mono mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity">≈ ${tx.fiatValue.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {currentView === View.SEND && (
            <div className="max-w-xl mx-auto space-y-10 animate-in slide-in-from-right duration-500">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-light text-gradient-metal tracking-tight">Enviar</h2>
                <div className="bg-white/5 px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-gray-400">
                  MULTI-CHAIN ENABLED
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Selecionar Ativo</label>
                  <AssetSelector onSelect={setSelectedAssetCode} selected={selectedAssetCode} />
                </div>

                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 group-focus-within:text-white transition-colors">Destinatário</label>
                  <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 p-5 rounded-xl text-white focus:border-white/40 focus:bg-white/10 focus:outline-none transition-all font-mono text-sm shadow-inner"
                    placeholder={`Endereço ${selectedAsset.name} (${selectedAsset.network})`}
                  />
                </div>
                
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 group-focus-within:text-white transition-colors">Montante</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full bg-transparent border-b-2 border-white/20 py-4 text-white focus:border-white focus:outline-none transition-all font-mono text-5xl placeholder-gray-800"
                      placeholder="0.00"
                    />
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xl">{selectedAssetCode}</span>
                  </div>
                  <div className="text-right mt-3 text-sm text-gray-500 font-mono">
                    Disponível: {selectedAsset.balance} {selectedAssetCode}
                  </div>
                </div>
                
                <Button fullWidth className="mt-8 py-4 text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                  CONFIRMAR ENVIO <ArrowRight size={20} className="ml-2" />
                </Button>
              </div>
            </div>
          )}

          {currentView === View.RECEIVE && (
            <div className="max-w-xl mx-auto flex flex-col items-center space-y-10 animate-in slide-in-from-right duration-500">
              <h2 className="text-3xl font-light text-gradient-metal tracking-tight">Receber</h2>
              
              <div className="w-full">
                 <label className="block text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Escolha a Rede</label>
                 <div className="flex justify-center">
                    <AssetSelector onSelect={setSelectedAssetCode} selected={selectedAssetCode} />
                 </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-[0_0_50px_rgba(255,255,255,0.1)] relative group">
                <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-2xl m-2 pointer-events-none"></div>
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${getAddress(selectedAssetCode)}`} 
                  alt="Wallet QR Code" 
                  className="w-64 h-64 mix-blend-multiply"
                />
              </div>
              
              <div className="w-full space-y-4">
                <label className="block text-center text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Endereço {selectedAsset.name} ({selectedAsset.network})
                </label>
                <button 
                  onClick={() => copyToClipboard(getAddress(selectedAssetCode))}
                  className="w-full flex items-center justify-between p-5 border border-white/10 rounded-xl hover:bg-white/5 hover:border-white/30 cursor-pointer transition-all group relative overflow-hidden"
                >
                  <span className="font-mono text-sm break-all text-gray-300 group-hover:text-white transition-colors relative z-10">
                    {getAddress(selectedAssetCode)}
                  </span>
                  <div className="ml-4 text-gray-500 group-hover:text-white relative z-10">
                    {copied ? <Check size={20} className="text-emerald-400" /> : <Copy size={20} />}
                  </div>
                </button>
                {copied && <div className="text-center text-sm text-emerald-400 font-medium animate-pulse">Endereço copiado!</div>}
              </div>
            </div>
          )}

          {currentView === View.HISTORY && (
            <div className="space-y-8 animate-in slide-in-from-right duration-500">
              <h2 className="text-3xl font-light text-gradient-metal tracking-tight">Livro Razão</h2>
              <div className="space-y-3">
                {MOCK_TRANSACTIONS.map((tx) => (
                  <div key={tx.id} className="p-6 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-300 group">
                    <div className="flex items-start md:items-center gap-6">
                      <div className={`p-4 rounded-full shadow-lg ${tx.type === 'received' ? 'bg-white text-black' : 'bg-white/5 text-white border border-white/10'}`}>
                        {tx.type === 'received' ? <ArrowDownLeft size={20} /> : <SendIcon size={20} />}
                      </div>
                      <div>
                        <div className="font-medium text-lg text-white group-hover:text-white transition-colors flex items-center gap-2">
                          {tx.type === 'received' ? 'Recebimento' : 'Envio'}
                          <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-gray-400">{tx.currency}</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">{tx.date}</div>
                        <div className="text-xs text-gray-600 font-mono mt-2 md:hidden break-all">{tx.address}</div>
                      </div>
                    </div>
                    
                    <div className="hidden md:block text-xs text-gray-600 font-mono bg-black/30 px-3 py-1 rounded-full border border-white/5">
                      {tx.address}
                    </div>

                    <div className="text-right flex flex-row md:flex-col justify-between items-center md:items-end">
                      <div className={`font-mono font-bold text-xl ${tx.type === 'received' ? 'text-emerald-400' : 'text-white'}`}>
                        {tx.type === 'received' ? '+' : '-'}{tx.amount} {tx.currency}
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                         <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${tx.status === 'confirmed' ? 'border-gray-700 text-gray-500' : 'border-yellow-900/50 text-yellow-500'}`}>
                           {tx.status}
                         </span>
                         <span className="text-sm text-gray-500">${tx.fiatValue.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentView === View.CARD && (
             <CryptoCard hasCard={hasCard} onIssue={() => setHasCard(true)} />
          )}

          {currentView === View.ORACLE && (
             <div className="h-full flex flex-col animate-in slide-in-from-right duration-500">
                <div className="mb-6">
                  <h2 className="text-3xl font-light text-gradient-metal tracking-tight mb-2">Oráculo</h2>
                  <p className="text-gray-500 text-sm">Inteligência Artificial conectada aos nós da rede.</p>
                </div>
                <div className="flex-1 min-h-0">
                  <Oracle />
                </div>
             </div>
          )}

          {currentView === View.REFERRAL && (
             <div className="max-w-3xl mx-auto space-y-12 animate-in slide-in-from-right duration-500">
                
                {/* Hero */}
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl mx-auto flex items-center justify-center border border-white/10 mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                    <Gift size={32} className="text-white" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-light text-gradient-metal tracking-tight">Convide & Ganhe</h2>
                  <p className="text-gray-400 max-w-lg mx-auto text-lg leading-relaxed">
                    A cada amigo que ativar o cartão Obsidian Black, <strong className="text-white">você recebe 5 USDT</strong> e <strong className="text-white">ele também</strong>.
                  </p>
                </div>

                {/* Progress Card */}
                <div className="glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -mr-16 -mt-16 group-hover:bg-emerald-500/10 transition-colors duration-700"></div>
                   
                   <div className="flex justify-between items-end mb-6 relative z-10">
                      <div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Ganhos Totais</div>
                        <div className="flex items-baseline gap-2">
                           <span className="text-5xl font-mono font-bold text-white tracking-tighter">{referralEarnings.toFixed(2)}</span>
                           <span className="text-emerald-400 font-bold">USDT</span>
                        </div>
                      </div>
                      <div className="text-right">
                         <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Limite Restante</div>
                         <div className="font-mono text-gray-300">{(referralLimit - referralEarnings).toFixed(2)} USDT</div>
                      </div>
                   </div>

                   <div className="relative h-4 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.5)] transition-all duration-1000 ease-out"
                        style={{ width: `${referralProgress}%` }}
                      ></div>
                   </div>
                   <div className="mt-3 flex justify-between text-[10px] uppercase tracking-widest font-bold text-gray-600">
                      <span>0 USDT</span>
                      <span>Limite: 100 USDT</span>
                   </div>
                </div>

                {/* Link Section */}
                <div className="space-y-4">
                   <label className="block text-center text-xs font-bold text-gray-500 uppercase tracking-widest">Seu Link Exclusivo</label>
                   <div className="flex items-center gap-4">
                      <div className="flex-1 bg-white/5 border border-white/10 p-4 rounded-xl font-mono text-sm text-white/80 overflow-hidden text-ellipsis whitespace-nowrap shadow-inner">
                         https://{referralLink}
                      </div>
                      <Button 
                         onClick={() => copyToClipboard(`https://${referralLink}`)}
                         className={`h-full min-w-[120px] shadow-lg ${copied ? 'bg-emerald-500 text-black hover:bg-emerald-400' : ''}`}
                      >
                         {copied ? <Check size={20} /> : <Share2 size={20} />}
                         {copied ? 'COPIADO' : 'COPIAR'}
                      </Button>
                   </div>
                </div>

                {/* History List */}
                <div className="space-y-4 pt-8 border-t border-white/5">
                   <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Indicações Recentes</h3>
                   <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                         <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 border border-white/5">
                                  <Users size={16} />
                               </div>
                               <div>
                                  <div className="font-mono text-sm text-gray-300">user_xxxx{8000 + i}</div>
                                  <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wide mt-0.5">Cartão Ativado</div>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="font-mono font-bold text-emerald-400">+5.00 USDT</div>
                               <div className="text-[10px] text-gray-600 mt-0.5">Hoje, 14:3{i}</div>
                            </div>
                         </div>
                      ))}
                      <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 opacity-50">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 border border-white/5">
                                  <Users size={16} />
                               </div>
                               <div>
                                  <div className="font-mono text-sm text-gray-500">user_yz921</div>
                                  <div className="text-[10px] text-yellow-600 font-bold uppercase tracking-wide mt-0.5">Pendente</div>
                               </div>
                            </div>
                            <div className="text-right">
                               <div className="font-mono font-bold text-gray-500">0.00 USDT</div>
                               <div className="text-[10px] text-gray-600 mt-0.5">Ontem</div>
                            </div>
                         </div>
                   </div>
                </div>

             </div>
          )}

          {currentView === View.PROFILE && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right duration-500">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-light text-gradient-metal tracking-tight">Identity Core</h2>
                  <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-xs font-mono text-emerald-400 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                     CONTA VERIFICADA
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Personal Data & Credentials */}
                  <div className="space-y-6">
                     <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                           <User size={14} /> Dados da Conta
                        </h3>

                        <div className="flex items-center gap-4 mb-6">
                           <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-white/20 flex items-center justify-center shadow-lg">
                              <span className="font-bold text-2xl text-white">SM</span>
                           </div>
                           <div>
                              <div className="text-lg font-bold text-white">Supremo Mestre</div>
                              <div className="text-sm text-gray-500">UID: 8492-AX-29</div>
                           </div>
                        </div>

                        <div className="space-y-4">
                           <div className="group">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-1 block">Nome de Usuário</label>
                              <div className="relative">
                                 <input type="text" value="Supremo Mestre" readOnly className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-gray-500 font-mono focus:outline-none cursor-not-allowed" />
                                 <Lock size={14} className="absolute right-3 top-3 text-gray-600" />
                              </div>
                           </div>
                           
                           <div className="pt-4 border-t border-white/5">
                              <label className="text-[10px] uppercase tracking-widest text-gray-500 mb-3 block">Credenciais de Acesso</label>
                              
                              <div className="space-y-3">
                                  <div className="flex gap-2 items-end">
                                      <div className="relative flex-1">
                                          <label className="text-[9px] text-gray-600 mb-1 block">Email Cadastrado</label>
                                          <input type="email" value="supremo@obsidian.protocol" readOnly className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-gray-300 font-mono focus:outline-none" />
                                      </div>
                                      <Button className="px-4 py-3 text-xs bg-white/5 hover:bg-white/10 border-white/10">Alterar</Button>
                                  </div>

                                  <div className="flex gap-2 items-end">
                                      <div className="relative flex-1">
                                          <label className="text-[9px] text-gray-600 mb-1 block">Senha de Acesso</label>
                                          <input type="password" value="xk9#mk29!01" readOnly className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-sm text-gray-300 font-mono focus:outline-none" />
                                      </div>
                                      <Button className="px-4 py-3 text-xs bg-white/5 hover:bg-white/10 border-white/10">Alterar</Button>
                                  </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Right Column: Contact Support */}
                  <div className="space-y-6">
                     <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col justify-center items-center text-center h-full min-h-[400px]">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
                           <LifeBuoy size={32} className="text-white" />
                        </div>
                        
                        <h3 className="text-xl font-bold text-white mb-3">Central de Ajuda</h3>
                        <p className="text-sm text-gray-400 max-w-xs mx-auto leading-relaxed mb-8">
                           Para questões de segurança, recuperação de conta ou problemas com transações, contate nossa equipe oficial.
                        </p>

                        <div className="w-full bg-white/5 border border-white/10 rounded-xl p-6 group hover:bg-white/10 transition-colors">
                           <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-3">Canal Oficial de Suporte</div>
                           <div className="flex items-center justify-center gap-3 text-emerald-400 font-mono text-lg font-bold break-all">
                              <Mail size={20} className="shrink-0" />
                              <span>suporte@obsidian.protocol</span>
                           </div>
                           <button 
                              onClick={() => copyToClipboard('suporte@obsidian.protocol')}
                              className="mt-4 text-xs bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full hover:bg-emerald-500/20 transition-all font-medium"
                           >
                              {copied ? 'EMAIL COPIADO PARA TRANSFERÊNCIA' : 'COPIAR ENDEREÇO DE EMAIL'}
                           </button>
                        </div>
                        
                        <div className="mt-8 text-[10px] text-gray-600 font-mono">
                           TEMPO MÉDIO DE RESPOSTA: 24H ÚTEIS
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}

        </div>
      </main>

      <Notifications notifications={notifications} onClose={removeNotification} />
    </div>
  );
};

export default App;