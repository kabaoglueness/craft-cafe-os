import { StationProgressStatus } from '../types';

/**
 * Normalizes varied station statuses into standard 3-phase progression:
 * 1. 'hazirlaniyor'
 * 2. 'yola_cikti'
 * 3. 'teslim_edildi'
 */
export const normalizeStatus = (status: string | undefined): StationProgressStatus => {
  if (
    status === 'teslim_edildi' || 
    status === 'masaya_teslim' || 
    status === 'paketlendi' || 
    status === 'servis_edildi' ||
    status === 'tamamlandi'
  ) {
    return 'teslim_edildi';
  }
  if (
    status === 'yola_cikti' || 
    status === 'serviste' || 
    status === 'masaya_cikti'
  ) {
    return 'yola_cikti';
  }
  return 'hazirlaniyor';
};
