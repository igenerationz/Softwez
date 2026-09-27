const SUPABASE_URL = "https://xpufypybqkqmrgewofeb.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_zv0wD1g__495k0kEylApsw_E1nJLOHi";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);