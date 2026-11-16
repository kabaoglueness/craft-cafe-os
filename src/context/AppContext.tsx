'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  CartItem, 
  CartWorkshopSelection, 
  CartCafeSelection, 
  ActiveOrder, 
  WorkshopItem, 
  WorkshopSizeOption, 
  WorkshopExtraOption, 
  CafeItem, 
  CafeItemOptionChoice,
  OrderStatus,
  WorkshopStationStatus,
  KitchenStationStatus,
  VenueSettings,
  StaffUser
} from '../types';
import { 
  INITIAL_ORDERS, 
  INITIAL_WORKSHOP_ITEMS, 
  INITIAL_CAFE_ITEMS, 
  INITIAL_VENUE_SETTINGS 
} from '../data/mockData';

export type UserRoleView = 'store' | 'customer_menu' | 'order_tracking' | 'login' | 'kitchen' | 'admin' | 'editor';

export const INITIAL_STAFF: StaffUser[] = [
  { id: 'u-ahmet', name: 'Ahmet Yılmaz (İşletme Yöneticisi)', passcode: 'yonetici', role: 'admin', phone: '+90 (555) 010 20 30' },
  { id: 'u-deniz', name: 'Deniz Kaya (KDS Sorumlusu)', passcode: 'mutfak', role: 'kitchen', phone: '+90 (555) 010 20 31' },
  { id: 'u-zeynep', name: 'Zeynep Demir (Vitrin Editörü)', passcode: 'edit', role: 'editor', phone: '+90 (555) 010 20 32' },
  { id: 'u-can', name: 'Can Arslan (Finans & Analist)', passcode: 'analiz', role: 'analyst', phone: '+90 (555) 010 20 33' },
];

export const REGISTERED_STAFF = INITIAL_STAFF;

interface OrderValidationResult {
  valid: boolean;
  message?: string;
}

interface AppContextType {
  // Venue Settings & Themes
  venueSettings: VenueSettings;
  updateVenueSettings: (settings: Partial<VenueSettings>) => void;
  updateStorefrontConfig: (config: Partial<VenueSettings['storefront']>) => void;
  updateThemeConfig: (theme: Partial<VenueSettings['theme']>) => void;

  // Active View & Auth
  activeView: UserRoleView;
  setActiveView: (view: UserRoleView) => void;
  currentStaff: StaffUser | null;
  loginWithPasscode: (passcode: string) => { success: boolean; message?: string };
  logout: () => void;

  // Staff & RBAC Management
  staffList: StaffUser[];
  addStaffUser: (user: Omit<StaffUser, 'id'>) => void;
  updateStaffUser: (id: string, updates: Partial<Omit<StaffUser, 'id'>>) => void;
  deleteStaffUser: (id: string) => void;

  // Table & Customer
  tableNumber: number;
  setTableNumber: (tbl: number) => void;
  customerName: string;
  setCustomerName: (name: string) => void;

  // Catalog State & Admin CRUD
  workshopItems: WorkshopItem[];
  cafeItems: CafeItem[];
  addWorkshopItem: (item: WorkshopItem) => void;
  updateWorkshopItem: (item: WorkshopItem) => void;
  deleteWorkshopItem: (id: string) => void;
  toggleWorkshopAvailability: (id: string) => void;
  updateWorkshopStock: (id: string, delta: number) => void;
  setWorkshopStock: (id: string, count: number) => void;
  updateWorkshopPrice: (id: string, price: number) => void;

  addCafeItem: (item: CafeItem) => void;
  updateCafeItem: (item: CafeItem) => void;
  deleteCafeItem: (id: string) => void;
  toggleCafeAvailability: (id: string) => void;
  updateCafeStock: (id: string, delta: number) => void;
  setCafeStock: (id: string, count: number) => void;
  updateCafePrice: (id: string, price: number) => void;

  // Cart
  cart: CartItem[];
  addWorkshopToCart: (
    item: WorkshopItem, 
    size: WorkshopSizeOption, 
    extras: WorkshopExtraOption[], 
    quantity?: number, 
    notes?: string
  ) => void;
  addCafeToCart: (
    item: CafeItem, 
    selectedOptions: Record<string, CafeItemOptionChoice>, 
    quantity?: number, 
    notes?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Order validation & placement
  validateOrder: () => OrderValidationResult;
  submitCurrentOrder: (notes?: string) => { order: ActiveOrder | null; error?: string };

  // Orders Management (KDS & Customer Tracking)
  orders: ActiveOrder[];
  activeOrderId: string | null;
  setActiveOrderId: (id: string | null) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateWorkshopStationStatus: (orderId: string, status: WorkshopStationStatus) => void;
  updateKitchenStationStatus: (orderId: string, status: KitchenStationStatus) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function safeSetStorage(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    if (err instanceof DOMException && (err.name === 'QuotaExceededError' || (err as { code?: number }).code === 22)) {
      console.warn(`Tarayıcı yerel depolama kotası aşıldı (${key}).`);
    } else {
      console.warn(`LocalStorage yazma hatası (${key}):`, err);
    }
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeView, setActiveView] = useState<UserRoleView>('store');
  const [currentStaff, setCurrentStaff] = useState<StaffUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Auto scroll to top on view changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeView]);

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      (window as unknown as { __setActiveView?: (view: UserRoleView) => void }).__setActiveView = setActiveView;
    }
  }, [setActiveView]);

  const [venueSettings, setVenueSettings] = useState<VenueSettings>(INITIAL_VENUE_SETTINGS);
  const [workshopItems, setWorkshopItems] = useState<WorkshopItem[]>(INITIAL_WORKSHOP_ITEMS);
  const [cafeItems, setCafeItems] = useState<CafeItem[]>(INITIAL_CAFE_ITEMS);
  const [staffList, setStaffList] = useState<StaffUser[]>(INITIAL_STAFF);

  const [tableNumber, setTableNumber] = useState<number>(4);
  const [customerName, setCustomerName] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<ActiveOrder[]>(INITIAL_ORDERS);
  const [activeOrderId, setActiveOrderId] = useState<string | null>('SIP-401');

  const handleSetTableNumber = (tbl: number) => {
    const maxTables = venueSettings.tableCount || 18;
    const bounded = Math.min(Math.max(1, tbl), maxTables);
    setTableNumber(bounded);
  };

  // Local storage synchronization (v5 purge)
  useEffect(() => {
    localStorage.removeItem('ab_workshop_items');
    localStorage.removeItem('ab_workshop_items_v2');
    localStorage.removeItem('ab_workshop_items_v3');
    localStorage.removeItem('ab_workshop_items_v4');
    localStorage.removeItem('ab_cafe_items');
    localStorage.removeItem('ab_cafe_items_v4');

    const timer = setTimeout(() => {
      const savedOrders = localStorage.getItem('ab_orders');
      if (savedOrders) {
        try { 
          const parsed: ActiveOrder[] = JSON.parse(savedOrders); 
          const normalized = parsed.map(o => ({
            ...o,
            workshopStatus: (o.workshopStatus === 'paketlendi' || o.workshopStatus === 'masaya_teslim' || o.workshopStatus === 'teslim_edildi')
              ? ('teslim_edildi' as const)
              : (o.workshopStatus === 'boyaniyor' || o.workshopStatus === 'vernik_kurutma' || o.workshopStatus === 'yola_cikti')
              ? ('yola_cikti' as const)
              : ('hazirlaniyor' as const),
            kitchenStatus: (o.kitchenStatus === 'servis_edildi' || o.kitchenStatus === 'teslim_edildi')
              ? ('teslim_edildi' as const)
              : (o.kitchenStatus === 'yola_cikti')
              ? ('yola_cikti' as const)
              : ('hazirlaniyor' as const)
          }));
          setOrders(normalized);
        } catch (e) { console.error(e); }
      }
      const savedSettings = localStorage.getItem('ab_venue_settings');
      let loadedTableCount = 18;
      if (savedSettings) {
        try { 
          const parsed = JSON.parse(savedSettings);
          if (!parsed.theme) {
            parsed.theme = INITIAL_VENUE_SETTINGS.theme;
          }
          if (parsed.tableCount) {
            loadedTableCount = parsed.tableCount;
          }
          setVenueSettings(parsed); 
        } catch (e) { console.error(e); }
      }
      const savedWorkshop = localStorage.getItem('ab_workshop_items_v6');
      if (savedWorkshop) {
        try { setWorkshopItems(JSON.parse(savedWorkshop)); } catch (e) { console.error(e); }
      }
      const savedCafe = localStorage.getItem('ab_cafe_items_v5');
      if (savedCafe) {
        try { setCafeItems(JSON.parse(savedCafe)); } catch (e) { console.error(e); }
      }
      const savedStaff = localStorage.getItem('ab_staff_list_v4');
      if (savedStaff) {
        try { setStaffList(JSON.parse(savedStaff)); } catch (e) { console.error(e); }
      }
      const savedCart = localStorage.getItem('ab_cart_v1');
      if (savedCart) {
        try { setCart(JSON.parse(savedCart)); } catch (e) { console.error(e); }
      }

      // Table QR Code auto-detection from URL (e.g. ?table=12, ?masa=12, ?m=12)
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const tableQuery = params.get('table') || params.get('masa') || params.get('m');
        if (tableQuery) {
          const parsed = parseInt(tableQuery, 10);
          if (!isNaN(parsed) && parsed > 0) {
            const bounded = Math.min(parsed, loadedTableCount);
            setTableNumber(bounded);
            safeSetStorage('ab_active_table', bounded.toString());
          }
        } else {
          const savedTable = localStorage.getItem('ab_active_table');
          if (savedTable) {
            const parsed = parseInt(savedTable, 10);
            if (!isNaN(parsed) && parsed > 0) {
              setTableNumber(parsed);
            }
          }
        }
      }

      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    safeSetStorage('ab_active_table', tableNumber.toString());
  }, [tableNumber, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    safeSetStorage('ab_orders', JSON.stringify(orders));
  }, [orders, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    safeSetStorage('ab_venue_settings', JSON.stringify(venueSettings));
  }, [venueSettings, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    safeSetStorage('ab_workshop_items_v6', JSON.stringify(workshopItems));
  }, [workshopItems, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    safeSetStorage('ab_cafe_items_v5', JSON.stringify(cafeItems));
  }, [cafeItems, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    safeSetStorage('ab_staff_list_v4', JSON.stringify(staffList));
  }, [staffList, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    safeSetStorage('ab_cart_v1', JSON.stringify(cart));
  }, [cart, isHydrated]);

  // Staff Authentication & Role Handling
  const loginWithPasscode = useCallback((passcode: string): { success: boolean; message?: string } => {
    const clean = passcode.trim().toLowerCase();
    const user = staffList.find(u => u.passcode.toLowerCase() === clean);
    if (!user) {
      return { success: false, message: 'Geçersiz personel şifresi. Lütfen tekrar deneyin.' };
    }

    setCurrentStaff(user);
    if (user.role === 'admin' || user.role === 'analyst') {
      setActiveView('admin');
    } else if (user.role === 'editor') {
      setActiveView('editor');
    } else {
      setActiveView('kitchen');
    }
    return { success: true };
  }, [staffList, setActiveView]);

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      (window as unknown as { __loginWithPasscode?: typeof loginWithPasscode }).__loginWithPasscode = loginWithPasscode;
    }
  }, [loginWithPasscode]);

  const logout = () => {
    setCurrentStaff(null);
    setActiveView('store');
  };

  // Staff RBAC Actions
  const addStaffUser = (userData: Omit<StaffUser, 'id'>) => {
    const newUser: StaffUser = {
      id: `u-${Date.now()}`,
      ...userData
    };
    setStaffList(prev => [...prev, newUser]);
  };

  const updateStaffUser = (id: string, updates: Partial<Omit<StaffUser, 'id'>>) => {
    setStaffList(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    if (currentStaff?.id === id) {
      setCurrentStaff(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteStaffUser = (id: string) => {
    setStaffList(prev => prev.filter(u => u.id !== id));
  };

  // Venue Settings & Theme Updates
  const updateVenueSettings = (settings: Partial<VenueSettings>) => {
    setVenueSettings(prev => ({ ...prev, ...settings }));
  };

  const updateStorefrontConfig = (config: Partial<VenueSettings['storefront']>) => {
    setVenueSettings(prev => ({
      ...prev,
      storefront: {
        ...prev.storefront,
        ...config
      }
    }));
  };

  const updateThemeConfig = (themeUpdate: Partial<VenueSettings['theme']>) => {
    setVenueSettings(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        ...themeUpdate
      }
    }));
  };

  // Admin Catalog Methods
  const addWorkshopItem = (item: WorkshopItem) => {
    setWorkshopItems(prev => [item, ...prev]);
  };

  const updateWorkshopItem = (item: WorkshopItem) => {
    setWorkshopItems(prev => prev.map(w => w.id === item.id ? item : w));
  };

  const deleteWorkshopItem = (id: string) => {
    setWorkshopItems(prev => prev.filter(w => w.id !== id));
  };

  const toggleWorkshopAvailability = (id: string) => {
    setWorkshopItems(prev => prev.map(w => {
      if (w.id === id) {
        const next = !w.isAvailable;
        return { ...w, isAvailable: next };
      }
      return w;
    }));
  };

  const updateWorkshopStock = (id: string, delta: number) => {
    setWorkshopItems(prev => prev.map(w => {
      if (w.id === id) {
        const newCount = Math.max(0, (w.stockCount || 0) + delta);
        return { ...w, stockCount: newCount, isAvailable: newCount > 0 };
      }
      return w;
    }));
  };

  const setWorkshopStock = (id: string, count: number) => {
    const validCount = Math.max(0, count);
    setWorkshopItems(prev => prev.map(w => {
      if (w.id === id) {
        return { ...w, stockCount: validCount, isAvailable: validCount > 0 };
      }
      return w;
    }));
  };

  const updateWorkshopPrice = (id: string, newPrice: number) => {
    setWorkshopItems(prev => prev.map(w => {
      if (w.id === id) {
        const updatedSizes = w.sizes.map((s, idx) => idx === 0 ? { ...s, price: newPrice } : s);
        return { ...w, sizes: updatedSizes };
      }
      return w;
    }));
  };

  const addCafeItem = (item: CafeItem) => {
    setCafeItems(prev => [item, ...prev]);
  };

  const updateCafeItem = (item: CafeItem) => {
    setCafeItems(prev => prev.map(c => c.id === item.id ? item : c));
  };

  const deleteCafeItem = (id: string) => {
    setCafeItems(prev => prev.filter(c => c.id !== id));
  };

  const toggleCafeAvailability = (id: string) => {
    setCafeItems(prev => prev.map(c => {
      if (c.id === id) {
        const next = !c.isAvailable;
        return { ...c, isAvailable: next };
      }
      return c;
    }));
  };

  const updateCafeStock = (id: string, delta: number) => {
    setCafeItems(prev => prev.map(c => {
      if (c.id === id) {
        const newCount = Math.max(0, (c.stockCount || 0) + delta);
        return { ...c, stockCount: newCount, isAvailable: newCount > 0 };
      }
      return c;
    }));
  };

  const setCafeStock = (id: string, count: number) => {
    const validCount = Math.max(0, count);
    setCafeItems(prev => prev.map(c => {
      if (c.id === id) {
        return { ...c, stockCount: validCount, isAvailable: validCount > 0 };
      }
      return c;
    }));
  };

  const updateCafePrice = (id: string, newPrice: number) => {
    setCafeItems(prev => prev.map(c => c.id === id ? { ...c, price: newPrice } : c));
  };

  // Cart Management
  const addWorkshopToCart = (
    item: WorkshopItem, 
    size: WorkshopSizeOption, 
    extras: WorkshopExtraOption[], 
    quantity = 1, 
    notes?: string
  ) => {
    const extrasTotal = extras.reduce((sum, ext) => sum + ext.price, 0);
    const unitPrice = size.price + extrasTotal;
    const totalPrice = unitPrice * quantity;

    const newItem: CartWorkshopSelection = {
      itemType: 'workshop',
      cartItemId: `ws-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      workshopItem: item,
      selectedSize: size,
      selectedExtras: extras,
      specialNotes: notes,
      quantity,
      unitPrice,
      totalPrice
    };

    setCart(prev => [...prev, newItem]);
  };

  const addCafeToCart = (
    item: CafeItem, 
    selectedOptions: Record<string, CafeItemOptionChoice>, 
    quantity = 1, 
    notes?: string
  ) => {
    const optionsDelta = Object.values(selectedOptions).reduce((sum, opt) => sum + opt.priceDelta, 0);
    const unitPrice = item.price + optionsDelta;
    const totalPrice = unitPrice * quantity;

    const newItem: CartCafeSelection = {
      itemType: 'cafe',
      cartItemId: `cf-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      cafeItem: item,
      selectedOptions,
      specialNotes: notes,
      quantity,
      unitPrice,
      totalPrice
    };

    setCart(prev => [...prev, newItem]);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(i => i.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = Math.max(1, item.quantity + delta);
        return {
          ...item,
          quantity: newQty,
          totalPrice: item.unitPrice * newQty
        };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Business Rules Validation
  const validateOrder = (): OrderValidationResult => {
    if (cart.length === 0) {
      return { valid: false, message: 'Adisyonunuzda ürün bulunmamaktadır.' };
    }

    if (!customerName.trim()) {
      return { valid: false, message: 'Lütfen sipariş sahibi adını veya masa adını giriniz.' };
    }

    // Mekan Kuralı 1: Masada en az 1 içecek zorunluluğu
    if (venueSettings.minDrinkRequired) {
      const hasDrink = cart.some(i => i.itemType === 'cafe');
      if (!hasDrink) {
        return { 
          valid: false, 
          message: 'Mekan kuralı gereği her masa için en az 1 içecek siparişi verilmesi zorunludur.' 
        };
      }
    }

    // Mekan Kuralı 2: Masada en az 1 atölye/heykel parçası zorunluluğu
    if (venueSettings.requireWorkshopItem) {
      const hasWorkshop = cart.some(i => i.itemType === 'workshop');
      if (!hasWorkshop) {
        return { 
          valid: false, 
          message: 'Mekan kuralı gereği masanız için en az 1 atölye (heykel, seramik vb.) seçimi yapılması gerekmektedir.' 
        };
      }
    }

    return { valid: true };
  };

  // Order Submission
  const submitCurrentOrder = (orderNotes?: string): { order: ActiveOrder | null; error?: string } => {
    const validation = validateOrder();
    if (!validation.valid) {
      return { order: null, error: validation.message };
    }

    const hasWorkshop = cart.some(i => i.itemType === 'workshop');
    const hasCafe = cart.some(i => i.itemType === 'cafe');

    const newOrder: ActiveOrder = {
      id: `SIP-${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`,
      tableNumber,
      customerName: customerName.trim(),
      createdAt: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
      status: 'received',
      items: [...cart],
      totalAmount: cartTotal,
      workshopStatus: hasWorkshop ? 'hazirlaniyor' : 'teslim_edildi',
      kitchenStatus: hasCafe ? 'hazirlaniyor' : 'teslim_edildi',
      notes: orderNotes
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrderId(newOrder.id);
    clearCart();
    return { order: newOrder };
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? { ...ord, status } : ord));
  };

  const updateWorkshopStationStatus = (orderId: string, status: WorkshopStationStatus) => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? { ...ord, workshopStatus: status } : ord));
  };

  const updateKitchenStationStatus = (orderId: string, status: KitchenStationStatus) => {
    setOrders(prev => prev.map(ord => ord.id === orderId ? { ...ord, kitchenStatus: status } : ord));
  };

  return (
    <AppContext.Provider value={{
      venueSettings,
      updateVenueSettings,
      updateStorefrontConfig,
      updateThemeConfig,
      activeView,
      setActiveView,
      currentStaff,
      loginWithPasscode,
      logout,
      staffList,
      addStaffUser,
      updateStaffUser,
      deleteStaffUser,
      tableNumber,
      setTableNumber: handleSetTableNumber,
      customerName,
      setCustomerName,
      workshopItems,
      cafeItems,
      addWorkshopItem,
      updateWorkshopItem,
      deleteWorkshopItem,
      toggleWorkshopAvailability,
      updateWorkshopStock,
      setWorkshopStock,
      updateWorkshopPrice,
      addCafeItem,
      updateCafeItem,
      deleteCafeItem,
      toggleCafeAvailability,
      updateCafeStock,
      setCafeStock,
      updateCafePrice,
      cart,
      addWorkshopToCart,
      addCafeToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      cartCount,
      validateOrder,
      submitCurrentOrder,
      orders,
      activeOrderId,
      setActiveOrderId,
      updateOrderStatus,
      updateWorkshopStationStatus,
      updateKitchenStationStatus
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
