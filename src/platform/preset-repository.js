// Browser persistence adapter. Validation happens before storage or game mutation.
import { parsePreset, serializePreset } from '../content/preset.js?v=ceff5e94';
import { STORAGE_PREFIX } from '../storage.js?v=ceff5e94';
export const DRAFT_KEY = STORAGE_PREFIX + 'ssg.fx-draft.v1';
export function createPresetRepository(backing = () => globalThis.localStorage) {
  return {
    read() { const text=backing().getItem(DRAFT_KEY); return text===null?null:parsePreset(text); },
    write(p) { const text=serializePreset(p); backing().setItem(DRAFT_KEY,text); return parsePreset(text); },
    clear() { backing().removeItem(DRAFT_KEY); },
  };
}
