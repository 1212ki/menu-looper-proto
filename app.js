const weekGrid = document.getElementById("weekGrid");
const landingSection = document.getElementById("landing");
const appSection = document.getElementById("app");
const recipesSection = document.getElementById("recipes");
const enterAppButton = document.getElementById("enterApp");
const enterRecipesButton = document.getElementById("enterRecipes");
const backToLandingButton = document.getElementById("backToLanding");
const openRecipesFromAppButton = document.getElementById("openRecipesFromApp");
const backToLandingFromRecipesButton = document.getElementById(
  "backToLandingFromRecipes",
);
const openAppFromRecipesButton = document.getElementById("openAppFromRecipes");
const weekStartInput = document.getElementById("weekStart");
const weekRange = document.getElementById("weekRange");
const saveStatus = document.getElementById("saveStatus");
const prevWeekButton = document.getElementById("prevWeek");
const nextWeekButton = document.getElementById("nextWeek");
const thisWeekButton = document.getElementById("thisWeek");
const clearWeekButton = document.getElementById("clearWeek");
const shoppingList = document.getElementById("shoppingList");
const shoppingEmpty = document.getElementById("shoppingEmpty");

const recipeForm = document.getElementById("recipeForm");
const recipeFormTitle = document.getElementById("recipeFormTitle");
const recipeNameInput = document.getElementById("recipeName");
const recipeUrlInput = document.getElementById("recipeUrl");
const recipeServingsInput = document.getElementById("recipeServings");
const ingredientList = document.getElementById("ingredientList");
const ingredientAddButton = document.getElementById("ingredientAdd");
const recipeSaveButton = document.getElementById("recipeSave");
const recipeCancelButton = document.getElementById("recipeCancel");
const recipeSearchInput = document.getElementById("recipeSearch");
const recipeList = document.getElementById("recipeList");
const recipeEmpty = document.getElementById("recipeEmpty");
const recipeModal = document.getElementById("recipeModal");
const recipeModalBackdrop = document.getElementById("recipeModalBackdrop");
const recipeModalForm = document.getElementById("recipeModalForm");
const recipeModalNameInput = document.getElementById("recipeModalName");
const recipeModalUrlInput = document.getElementById("recipeModalUrl");
const recipeModalServingsInput = document.getElementById("recipeModalServings");
const recipeModalIngredientList = document.getElementById("recipeModalIngredientList");
const recipeModalIngredientAddButton = document.getElementById("recipeModalIngredientAdd");
const recipeModalCancelButton = document.getElementById("recipeModalCancel");
const recipeModalCloseButton = document.getElementById("recipeModalClose");
const recipeFetchButton = document.getElementById("recipeFetch");
const recipeFetchStatus = document.getElementById("recipeFetchStatus");
const recipeTextToggle = document.getElementById("recipeTextToggle");
const recipeTextArea = document.getElementById("recipeTextArea");
const recipeTextInput = document.getElementById("recipeTextInput");
const recipeTextParse = document.getElementById("recipeTextParse");

const recipeModalFetchButton = document.getElementById("recipeModalFetch");
const recipeModalFetchStatus = document.getElementById("recipeModalFetchStatus");
const recipeModalTextToggle = document.getElementById("recipeModalTextToggle");
const recipeModalTextArea = document.getElementById("recipeModalTextArea");
const recipeModalTextInput = document.getElementById("recipeModalTextInput");
const recipeModalTextParse = document.getElementById("recipeModalTextParse");
const recipeModalInstructionsInput = document.getElementById("recipeModalInstructions");

const recipeInstructionsInput = document.getElementById("recipeInstructions");

const recipeTagInput = document.getElementById("recipeTagInput");
const recipeTagList = document.getElementById("recipeTagList");
const recipeModalTagInput = document.getElementById("recipeModalTagInput");
const recipeModalTagList = document.getElementById("recipeModalTagList");
const tagFilter = document.getElementById("tagFilter");
const tagFilterList = document.getElementById("tagFilterList");

const loadingOverlay = document.getElementById("loadingOverlay");
const loadingText = document.getElementById("loadingText");

const CORS_PROXY = "https://api.allorigins.win/raw?url=";
const OLLAMA_API = "http://localhost:11434/api/generate";
const OLLAMA_MODEL = "gemma2:2b";

function showLoading(message = "解析中...") {
  loadingText.textContent = message;
  loadingOverlay.hidden = false;
}

function hideLoading() {
  loadingOverlay.hidden = true;
}

const DAY_LABELS = ["月", "火", "水", "木", "金", "土", "日"];
const RECIPE_DB_KEY = "recipe-db-v1";
const SERVING_OPTIONS = [1, 2, 3, 4];
const DEFAULT_BASE_SERVINGS = 2;
const DEFAULT_RECIPE_DB = [
  {
    id: "default-curry",
    name: "チキンとゴロゴロ野菜のカレーライス",
    url: "https://park.ajinomoto.co.jp/recipe/card/801044/",
    baseServings: 2,
    ingredients: [
      { name: "鶏むね肉", grams: 125 },
      { name: "じゃがいも", count: 1, grams: 100 },
      { name: "玉ねぎ", count: 0.5, grams: 100 },
      { name: "にんじん", count: 0.5, grams: 50 },
      { name: "ほうれん草", count: 0.5, grams: 100 },
      { name: "しめじ", count: 0.25, grams: 25 },
      { name: "水", grams: 300 },
      { name: "コンソメ（固形）", count: 0.5 },
      { name: "カレールウ", grams: 40 },
      { name: "ご飯", grams: 440 },
      { name: "オリーブオイル" },
    ],
  },
  {
    id: "default-stew",
    name: "野菜たっぷりクリームシチュー",
    url: "https://park.ajinomoto.co.jp/recipe/card/708853/",
    baseServings: 2,
    ingredients: [
      { name: "じゃがいも", count: 1, grams: 150 },
      { name: "玉ねぎ", count: 0.5, grams: 100 },
      { name: "にんじん", count: 0.5, grams: 80 },
      { name: "ベーコン", grams: 30 },
      { name: "薄力粉" },
      { name: "水", grams: 200 },
      { name: "コンソメ（顆粒）" },
      { name: "牛乳", grams: 200 },
      { name: "塩" },
      { name: "こしょう" },
      { name: "オリーブオイル" },
    ],
  },
  {
    id: "default-hamburg",
    name: "味付きチーズハンバーグ",
    url: "https://park.ajinomoto.co.jp/recipe/card/805060/",
    baseServings: 2,
    ingredients: [
      { name: "合いびき肉", grams: 250 },
      { name: "玉ねぎ", count: 0.5, grams: 100 },
      { name: "オニオンコンソメスープ", count: 1 },
      { name: "片栗粉" },
      { name: "塩" },
      { name: "こしょう" },
      { name: "水", grams: 50 },
      { name: "スライスチーズ", count: 1, grams: 20 },
      { name: "サラダ油" },
      { name: "ブロッコリー", count: 4, grams: 60 },
      { name: "トマト", count: 0.5, grams: 100 },
    ],
  },
  {
    id: "default-ginger-pork",
    name: "マヨうま！豚のしょうが焼き",
    url: "https://park.ajinomoto.co.jp/recipe/card/802666/",
    baseServings: 2,
    ingredients: [
      { name: "豚ロース薄切り肉", grams: 200 },
      { name: "玉ねぎ", count: 0.5 },
      { name: "しょうが" },
      { name: "しょうゆ" },
      { name: "みりん" },
      { name: "酒" },
      { name: "ほんだし" },
      { name: "マヨネーズ" },
      { name: "キャベツ" },
      { name: "ミニトマト", count: 4 },
    ],
  },
  {
    id: "default-roll-cabbage",
    name: "うま塩ロールキャベツ",
    url: "https://park.ajinomoto.co.jp/recipe/card/803698/",
    baseServings: 2,
    ingredients: [
      { name: "キャベツ", count: 4 },
      { name: "合いびき肉", grams: 100 },
      { name: "玉ねぎ", count: 0.5, grams: 100 },
      { name: "にんじん", count: 0.33 },
      { name: "味の素" },
      { name: "こしょう" },
      { name: "水", grams: 400 },
      { name: "鶏だしキューブ", count: 1 },
      { name: "ピザ用チーズ" },
      { name: "スパゲッティ" },
    ],
  },
  {
    id: "default-tofu-spring-roll",
    name: "豆腐とひき肉のふんわり春巻き",
    url: "https://www.kurashiru.com/recipes/e5cb0736-8293-4247-aada-aa3d6b5fcac6",
    baseServings: 2,
    ingredients: [
      { name: "春巻きの皮" },
      { name: "絹ごし豆腐" },
      { name: "豚ひき肉" },
      { name: "長ねぎ" },
      { name: "オイスターソース" },
      { name: "しょうゆ" },
      { name: "塩こしょう" },
      { name: "水溶き薄力粉" },
      { name: "揚げ油" },
      { name: "パセリ" },
    ],
  },
  {
    id: "default-miso-soup",
    name: "わかめの味噌汁",
    url: "https://park.ajinomoto.co.jp/recipe/card/709413/",
    baseServings: 2,
    ingredients: [
      { name: "乾燥カットわかめ", grams: 3 },
      { name: "大根", grams: 75 },
      { name: "水", grams: 300 },
      { name: "ほんだし" },
      { name: "みそ" },
    ],
  },
  {
    id: "default-dashimaki",
    name: "定番☆だし巻き卵",
    url: "https://park.ajinomoto.co.jp/recipe/card/801029/",
    baseServings: 2,
    ingredients: [
      { name: "卵", count: 3 },
      { name: "水" },
      { name: "みりん" },
      { name: "うす口しょうゆ" },
      { name: "ほんだし" },
      { name: "塩" },
      { name: "サラダ油" },
      { name: "大根おろし" },
      { name: "しょうゆ" },
    ],
  },
  {
    id: "default-omurice",
    name: "GOLD チキンオムライス",
    url: "https://park.ajinomoto.co.jp/recipe/card/801980/",
    baseServings: 2,
    ingredients: [
      { name: "ご飯", count: 2 },
      { name: "鶏もも肉", count: 0.5 },
      { name: "冷凍シーフードミックス", grams: 100 },
      { name: "にんじん", count: 0.5 },
      { name: "トマトケチャップ" },
      { name: "コンソメ（顆粒）" },
      { name: "ブロッコリー", count: 0.5 },
      { name: "ミニトマト", count: 0.5 },
      { name: "卵", count: 2 },
      { name: "サラダ油" },
    ],
  },
];

let currentWeekStart = startOfWeek(new Date());
let currentData = loadWeekData(currentWeekStart);
let recipeDb = loadRecipeDb();
let saveTimer = null;
let editingRecipeId = null;
let modalDayKey = null;
let modalDishId = null;

// タグ管理
let currentTags = [];
let modalTags = [];
let activeTagFilter = null;

function getAllTags() {
  const recipes = loadRecipeDb();
  const tagSet = new Set();
  recipes.forEach(recipe => {
    if (recipe.tags && Array.isArray(recipe.tags)) {
      recipe.tags.forEach(tag => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}

function renderTagList(container, tags, onRemove) {
  container.innerHTML = "";
  tags.forEach(tag => {
    const tagEl = document.createElement("span");
    tagEl.className = "tag";
    tagEl.innerHTML = `${tag}<button type="button" class="tag__remove" aria-label="削除">&times;</button>`;
    tagEl.querySelector(".tag__remove").addEventListener("click", () => {
      onRemove(tag);
    });
    container.appendChild(tagEl);
  });
}

function setupTagInput(input, listEl, tagsArray, updateFn) {
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = input.value.trim().replace(/,/g, "");
      if (tag && !tagsArray.includes(tag)) {
        tagsArray.push(tag);
        updateFn();
        renderTagList(listEl, tagsArray, (removedTag) => {
          const index = tagsArray.indexOf(removedTag);
          if (index > -1) tagsArray.splice(index, 1);
          updateFn();
          renderTagList(listEl, tagsArray, arguments.callee);
        });
      }
      input.value = "";
    }
  });
}

function renderTagFilter() {
  const allTags = getAllTags();
  if (allTags.length === 0) {
    tagFilter.hidden = true;
    return;
  }
  tagFilter.hidden = false;
  tagFilterList.innerHTML = "";

  // 「すべて」ボタン
  const allBtn = document.createElement("button");
  allBtn.type = "button";
  allBtn.className = `tag-filter__btn ${activeTagFilter === null ? "tag-filter__btn--active" : ""}`;
  allBtn.textContent = "すべて";
  allBtn.addEventListener("click", () => {
    activeTagFilter = null;
    renderTagFilter();
    renderRecipeList();
  });
  tagFilterList.appendChild(allBtn);

  allTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `tag-filter__btn ${activeTagFilter === tag ? "tag-filter__btn--active" : ""}`;
    btn.textContent = tag;
    btn.addEventListener("click", () => {
      activeTagFilter = tag;
      renderTagFilter();
      renderRecipeList();
    });
    tagFilterList.appendChild(btn);
  });
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function startOfWeek(date) {
  const base = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const weekday = (base.getDay() + 6) % 7;
  base.setDate(base.getDate() - weekday);
  return base;
}

function storageKey(weekStart) {
  return `recipe-week-${formatDate(weekStart)}`;
}

function loadWeekData(weekStart) {
  const key = storageKey(weekStart);
  const raw = localStorage.getItem(key);
  if (!raw) {
    return { days: {}, shoppingChecked: {}, updatedAt: null };
  }
  try {
    const parsed = JSON.parse(raw);
    return {
      days: parsed.days || {},
      shoppingChecked: parsed.shoppingChecked || {},
      updatedAt: parsed.updatedAt || null,
    };
  } catch (error) {
    return { days: {}, shoppingChecked: {}, updatedAt: null };
  }
}

function saveWeekData() {
  const key = storageKey(currentWeekStart);
  const payload = {
    days: currentData.days,
    shoppingChecked: currentData.shoppingChecked || {},
    updatedAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(key, JSON.stringify(payload));
    return true;
  } catch (error) {
    return false;
  }
}

function setSaveStatus(text) {
  saveStatus.textContent = text;
  saveStatus.classList.toggle('save-status--saving', text === '保存中...');
  saveStatus.classList.toggle('save-status--error', text === '保存に失敗');
}

function scheduleSave() {
  setSaveStatus("保存中...");
  if (saveTimer) {
    clearTimeout(saveTimer);
  }
  saveTimer = setTimeout(() => {
    const ok = saveWeekData();
    setSaveStatus(ok ? "保存済み" : "保存に失敗");
  }, 300);
}

function commitSave() {
  setSaveStatus("保存中...");
  if (saveTimer) {
    clearTimeout(saveTimer);
  }
  const ok = saveWeekData();
  setSaveStatus(ok ? "保存済み" : "保存に失敗");
}

function getDayData(key) {
  if (!currentData.days[key]) {
    currentData.days[key] = {};
  }
  const day = currentData.days[key];
  if (typeof day.dinner === "string" && !day.dinnerId && !day.dinnerText) {
    day.dinnerText = day.dinner;
  }
  if (!Array.isArray(day.dishes)) {
    day.dishes = [];
  }
  if (day.dinnerId || day.dinnerText) {
    day.dishes.push(
      createDishEntry({
        recipeId: day.dinnerId || null,
        servings: day.servings,
        draftName: day.dinnerText || "",
      }),
    );
  }
  day.dishes = day.dishes.map(normalizeDishEntry).filter(Boolean);
  if (day.dishes.length === 0) {
    day.dishes.push(createDishEntry());
  }
  delete day.dinner;
  delete day.dinnerId;
  delete day.dinnerText;
  delete day.servings;
  return day;
}

function getShoppingState() {
  if (!currentData.shoppingChecked || typeof currentData.shoppingChecked !== "object") {
    currentData.shoppingChecked = {};
  }
  return currentData.shoppingChecked;
}

function normalizeText(value) {
  return value.trim().toLowerCase();
}

function normalizeNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    return 0;
  }
  return number;
}

function formatNumber(value) {
  const rounded = Math.round(value * 100) / 100;
  return Number.isInteger(rounded) ? String(rounded) : String(rounded);
}

function normalizeBaseServings(value) {
  const number = Number(value);
  if (SERVING_OPTIONS.includes(number)) {
    return number;
  }
  return DEFAULT_BASE_SERVINGS;
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function createDishEntry({ recipeId = null, servings = 0, draftName = "" } = {}) {
  const entry = {
    id: createId("dish"),
    recipeId: recipeId || null,
    draftName: String(draftName || "").trim(),
  };
  const servingsValue = normalizeNumber(servings);
  if (servingsValue > 0) {
    entry.servings = servingsValue;
  }
  return entry;
}

function normalizeDishEntry(entry) {
  if (!entry || typeof entry !== "object") {
    return null;
  }
  const id = typeof entry.id === "string" ? entry.id : createId("dish");
  const recipeId = typeof entry.recipeId === "string" ? entry.recipeId : null;
  const draftName = String(entry.draftName || "").trim();
  const servingsValue = normalizeNumber(entry.servings);
  const normalized = { id, recipeId, draftName };
  if (servingsValue > 0) {
    normalized.servings = servingsValue;
  }
  return normalized;
}

function resolveDishServings(dish, recipe) {
  if (!recipe) {
    return 0;
  }
  const base = normalizeBaseServings(recipe.baseServings);
  const custom = normalizeNumber(dish.servings);
  return custom > 0 ? custom : base;
}

function normalizeIngredient(entry) {
  if (typeof entry === "string") {
    return { name: entry, amount: 0, unit: "" };
  }
  if (!entry || typeof entry !== "object") {
    return null;
  }
  const name = String(entry.name || "").trim();
  if (!name) {
    return null;
  }
  // Support legacy format (count, grams) and new format (amount, unit)
  if (entry.amount !== undefined || entry.unit !== undefined) {
    return {
      name,
      amount: normalizeNumber(entry.amount),
      unit: String(entry.unit || "").trim(),
    };
  }
  // Convert legacy format
  const count = normalizeNumber(entry.count);
  const grams = normalizeNumber(entry.grams);
  if (grams > 0) {
    return { name, amount: grams, unit: "g" };
  }
  if (count > 0) {
    return { name, amount: count, unit: "個" };
  }
  return { name, amount: 0, unit: "" };
}

function normalizeIngredients(list) {
  if (!Array.isArray(list)) {
    return [];
  }
  return list.map(normalizeIngredient).filter(Boolean);
}

function formatIngredientDisplay(ingredient) {
  if (ingredient.amount > 0 && ingredient.unit) {
    return `${ingredient.name} ${formatNumber(ingredient.amount)}${ingredient.unit}`;
  }
  if (ingredient.amount > 0) {
    return `${ingredient.name} ${formatNumber(ingredient.amount)}`;
  }
  return ingredient.name;
}

function buildDefaultRecipeDb() {
  const now = new Date().toISOString();
  return DEFAULT_RECIPE_DB.map((recipe) => ({
    ...recipe,
    baseServings: normalizeBaseServings(recipe.baseServings),
    ingredients: normalizeIngredients(recipe.ingredients),
    createdAt: now,
    updatedAt: now,
  }));
}

function mergeDefaultRecipes(existingRecipes) {
  const normalized = existingRecipes.map((recipe) => ({
    ...recipe,
    baseServings: normalizeBaseServings(recipe.baseServings),
    ingredients: normalizeIngredients(recipe.ingredients),
  }));
  const idSet = new Set(normalized.map((recipe) => recipe.id).filter(Boolean));
  const nameSet = new Set(
    normalized.map((recipe) => normalizeText(recipe.name || "")).filter(Boolean),
  );
  const defaults = buildDefaultRecipeDb();
  const additions = defaults.filter((recipe) => {
    const nameKey = normalizeText(recipe.name || "");
    return !idSet.has(recipe.id) && !nameSet.has(nameKey);
  });
  if (additions.length === 0) {
    return normalized;
  }
  return normalized.concat(additions);
}

function loadRecipeDb() {
  const raw = localStorage.getItem(RECIPE_DB_KEY);
  if (!raw) {
    const seeded = buildDefaultRecipeDb();
    localStorage.setItem(RECIPE_DB_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      const seeded = buildDefaultRecipeDb();
      localStorage.setItem(RECIPE_DB_KEY, JSON.stringify(seeded));
      return seeded;
    }
    if (parsed.length === 0) {
      const seeded = buildDefaultRecipeDb();
      localStorage.setItem(RECIPE_DB_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const merged = mergeDefaultRecipes(parsed);
    if (merged.length !== parsed.length) {
      localStorage.setItem(RECIPE_DB_KEY, JSON.stringify(merged));
    }
    return merged;
  } catch (error) {
    const seeded = buildDefaultRecipeDb();
    localStorage.setItem(RECIPE_DB_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function saveRecipeDb() {
  try {
    localStorage.setItem(RECIPE_DB_KEY, JSON.stringify(recipeDb));
    return true;
  } catch (error) {
    return false;
  }
}

function searchRecipes(query) {
  const normalized = normalizeText(query);
  if (!normalized) {
    return [];
  }
  return recipeDb.filter((recipe) => {
    const ingredientsText = recipe.ingredients
      .map((ingredient) => ingredient.name)
      .join(" ");
    const tagsText = recipe.tags ? recipe.tags.join(" ") : "";
    const haystack = normalizeText(`${recipe.name} ${ingredientsText} ${tagsText}`);
    return haystack.includes(normalized);
  });
}

function getRecipeById(id) {
  return recipeDb.find((recipe) => recipe.id === id) || null;
}

function getRecipeByName(name) {
  const normalized = normalizeText(name);
  if (!normalized) {
    return null;
  }
  return recipeDb.find((recipe) => normalizeText(recipe.name) === normalized) || null;
}

function selectRecipeForDish(dayKey, dishId, recipe) {
  const entry = getDayData(dayKey);
  const dish = entry.dishes.find((item) => item.id === dishId);
  if (!dish) {
    return;
  }
  dish.recipeId = recipe.id;
  dish.draftName = "";
  dish.servings = normalizeBaseServings(recipe.baseServings);
  commitSave();
  renderWeek(currentWeekStart);
}

function removeDish(dayKey, dishId) {
  const entry = getDayData(dayKey);
  entry.dishes = entry.dishes.filter((dish) => dish.id !== dishId);
  if (entry.dishes.length === 0) {
    entry.dishes.push(createDishEntry());
  }
  commitSave();
  renderWeek(currentWeekStart);
}

function clearDishSelection(dayKey, dishId) {
  const entry = getDayData(dayKey);
  const dish = entry.dishes.find((item) => item.id === dishId);
  if (!dish) {
    return;
  }
  dish.recipeId = null;
  dish.draftName = "";
  delete dish.servings;
  commitSave();
  renderWeek(currentWeekStart);
}

function openRecipeModal({ dayKey, dishId, name }) {
  modalDayKey = dayKey;
  modalDishId = dishId;
  recipeModalForm.reset();
  recipeModalNameInput.value = name || "";
  recipeModalUrlInput.value = "";
  recipeModalServingsInput.value = String(DEFAULT_BASE_SERVINGS);
  recipeModalInstructionsInput.value = "";
  resetIngredientList(recipeModalIngredientList);
  // モーダルのタグをリセット
  modalTags = [];
  renderTagList(recipeModalTagList, modalTags, () => {});
  recipeModal.hidden = false;
  document.body.classList.add("modal-open");
  recipeModalNameInput.focus();
}

function closeRecipeModal() {
  recipeModal.hidden = true;
  document.body.classList.remove("modal-open");
  modalDayKey = null;
  modalDishId = null;
}

function createIngredientRow(listEl, { name = "", amount = "", unit = "" } = {}) {
  const row = document.createElement("div");
  row.className = "ingredient-row";

  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.placeholder = "例：玉ねぎ";
  nameInput.value = name;
  nameInput.dataset.field = "name";

  const amountInput = document.createElement("input");
  amountInput.type = "number";
  amountInput.min = "0";
  amountInput.step = "any";
  amountInput.placeholder = "数量";
  // 数値として有効な値（0を含む）は表示、それ以外は空
  amountInput.value = (amount !== "" && amount !== null && amount !== undefined) ? String(amount) : "";
  amountInput.dataset.field = "amount";

  const unitInput = document.createElement("input");
  unitInput.type = "text";
  unitInput.placeholder = "単位";
  unitInput.value = unit || "";
  unitInput.dataset.field = "unit";

  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "削除";
  removeButton.addEventListener("click", () => {
    row.remove();
    if (listEl.children.length === 0) {
      createIngredientRow(listEl);
    }
  });

  row.appendChild(nameInput);
  row.appendChild(amountInput);
  row.appendChild(unitInput);
  row.appendChild(removeButton);
  listEl.appendChild(row);
}

function resetIngredientList(listEl, ingredients = []) {
  listEl.innerHTML = "";
  if (ingredients.length === 0) {
    createIngredientRow(listEl);
    return;
  }
  ingredients.forEach((ingredient) => createIngredientRow(listEl, ingredient));
}

function collectIngredientsFrom(listEl) {
  const rows = listEl.querySelectorAll(".ingredient-row");
  const ingredients = [];

  rows.forEach((row) => {
    const name = row.querySelector('[data-field="name"]').value.trim();
    if (!name) {
      return;
    }
    const amountValue = row.querySelector('[data-field="amount"]').value;
    const unitValue = row.querySelector('[data-field="unit"]').value.trim();
    const amount = normalizeNumber(amountValue);
    ingredients.push({ name, amount, unit: unitValue });
  });

  return ingredients;
}

function addIngredientRow() {
  createIngredientRow(ingredientList);
}

function collectIngredients() {
  return collectIngredientsFrom(ingredientList);
}

function resetRecipeForm() {
  editingRecipeId = null;
  recipeFormTitle.textContent = "レシピを登録";
  recipeSaveButton.textContent = "登録";
  recipeCancelButton.hidden = true;
  recipeForm.reset();
  recipeServingsInput.value = String(DEFAULT_BASE_SERVINGS);
  recipeInstructionsInput.value = "";
  resetIngredientList(ingredientList);
  // タグをリセット
  currentTags = [];
  renderTagList(recipeTagList, currentTags, () => {});
}

function fillRecipeForm(recipe) {
  recipeNameInput.value = recipe.name || "";
  recipeUrlInput.value = recipe.url || "";
  recipeServingsInput.value = String(normalizeBaseServings(recipe.baseServings));
  recipeInstructionsInput.value = recipe.instructions || "";
  resetIngredientList(ingredientList, normalizeIngredients(recipe.ingredients));
  // タグを設定
  currentTags = recipe.tags ? [...recipe.tags] : [];
  renderTagList(recipeTagList, currentTags, (removedTag) => {
    const index = currentTags.indexOf(removedTag);
    if (index > -1) currentTags.splice(index, 1);
    renderTagList(recipeTagList, currentTags, arguments.callee);
  });
}

// --- Recipe Fetch from URL ---

function detectUrlType(url) {
  try {
    const u = new URL(url);
    const host = u.hostname.toLowerCase();
    if (host.includes("youtube.com") || host.includes("youtu.be")) {
      return "youtube";
    }
    if (host.includes("twitter.com") || host.includes("x.com")) {
      return "twitter";
    }
    return "web";
  } catch {
    return "web";
  }
}

async function fetchUrlContent(url) {
  const proxyUrl = CORS_PROXY + encodeURIComponent(url);
  const response = await fetch(proxyUrl);
  const html = await response.text();
  return { type: detectUrlType(url), content: html, url };
}

// JSON-LD (schema.org/Recipe) から直接レシピを抽出
function extractRecipeFromJsonLd(html) {
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;

  while ((match = scriptRegex.exec(html)) !== null) {
    try {
      const json = JSON.parse(match[1]);
      const recipes = Array.isArray(json) ? json : [json];

      for (const item of recipes) {
        // @graph形式の対応
        const candidates = item["@graph"] ? item["@graph"] : [item];

        for (const candidate of candidates) {
          if (candidate["@type"] === "Recipe" ||
              (Array.isArray(candidate["@type"]) && candidate["@type"].includes("Recipe"))) {
            return parseSchemaRecipe(candidate);
          }
        }
      }
    } catch (e) {
      // パース失敗は無視して次へ
    }
  }
  return null;
}

function parseSchemaRecipe(schema) {
  const name = schema.name || "";
  const servings = parseInt(schema.recipeYield) || 2;

  const ingredients = [];
  const rawIngredients = schema.recipeIngredient || [];

  for (const ing of rawIngredients) {
    if (typeof ing === "string") {
      // "玉ねぎ 1個" や "鶏肉 200g" のようなパターンを解析
      const parsed = parseIngredientString(ing);
      ingredients.push(parsed);
    }
  }

  // 手順を抽出
  let instructions = "";
  const rawInstructions = schema.recipeInstructions || [];
  if (Array.isArray(rawInstructions)) {
    const steps = rawInstructions.map((step, index) => {
      if (typeof step === "string") {
        return `${index + 1}. ${step}`;
      }
      if (step && step.text) {
        return `${index + 1}. ${step.text}`;
      }
      if (step && step.name) {
        return `${index + 1}. ${step.name}`;
      }
      return null;
    }).filter(Boolean);
    instructions = steps.join("\n");
  } else if (typeof rawInstructions === "string") {
    instructions = rawInstructions;
  }

  return { name, servings, ingredients, instructions };
}

function parseIngredientString(str) {
  // 数量と単位を抽出する簡易パーサー
  const result = { name: str.trim(), amount: "", unit: "" };

  // ミリリットル: "200ml", "200mL", "200ミリリットル"
  const mlMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:ml|mL|ミリリットル)/i);
  if (mlMatch) {
    result.amount = parseFloat(mlMatch[1]);
    result.unit = "ml";
    result.name = str.replace(mlMatch[0], "").trim();
    result.name = result.name.replace(/^\d+(?:\.\d+)?\s*/, "").trim();
    if (!result.name) result.name = str.trim();
    return result;
  }

  // グラム数: "200g", "200グラム"
  const gramsMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:g|グラム)/i);
  if (gramsMatch) {
    result.amount = parseFloat(gramsMatch[1]);
    result.unit = "g";
    result.name = str.replace(gramsMatch[0], "").trim();
    result.name = result.name.replace(/^\d+(?:\.\d+)?\s*/, "").trim();
    if (!result.name) result.name = str.trim();
    return result;
  }

  // cc/CC: "200cc"
  const ccMatch = str.match(/(\d+(?:\.\d+)?)\s*(?:cc|CC)/i);
  if (ccMatch) {
    result.amount = parseFloat(ccMatch[1]);
    result.unit = "ml";
    result.name = str.replace(ccMatch[0], "").trim();
    result.name = result.name.replace(/^\d+(?:\.\d+)?\s*/, "").trim();
    if (!result.name) result.name = str.trim();
    return result;
  }

  // 日本語の単位パターン（単位が先、数量が後: "大さじ1", "大さじ1/2"）
  const unitFirstPatterns = [
    { regex: /(大さじ)\s*(\d+(?:\/\d+)?)/, unit: "大さじ" },
    { regex: /(小さじ)\s*(\d+(?:\/\d+)?)/, unit: "小さじ" },
    { regex: /(カップ)\s*(\d+(?:\/\d+)?)/, unit: "カップ" },
  ];

  for (const { regex, unit } of unitFirstPatterns) {
    const match = str.match(regex);
    if (match) {
      const amountStr = match[2];
      if (amountStr.includes("/")) {
        const [num, den] = amountStr.split("/").map(Number);
        result.amount = num / den;
      } else {
        result.amount = parseFloat(amountStr);
      }
      result.unit = unit;
      result.name = str.replace(match[0], "").trim();
      if (!result.name) result.name = str.trim();
      return result;
    }
  }

  // 単位付き数量（数量が先: "1個", "2本", "1/2片"）
  const unitPatterns = [
    { regex: /(\d+(?:\/\d+)?)\s*(個)/, unit: "個" },
    { regex: /(\d+(?:\/\d+)?)\s*(本)/, unit: "本" },
    { regex: /(\d+(?:\/\d+)?)\s*(枚)/, unit: "枚" },
    { regex: /(\d+(?:\/\d+)?)\s*(切れ)/, unit: "切れ" },
    { regex: /(\d+(?:\/\d+)?)\s*(片)/, unit: "片" },
    { regex: /(\d+(?:\/\d+)?)\s*(かけ)/, unit: "かけ" },
    { regex: /(\d+(?:\/\d+)?)\s*(束)/, unit: "束" },
    { regex: /(\d+(?:\/\d+)?)\s*(袋)/, unit: "袋" },
    { regex: /(\d+(?:\/\d+)?)\s*(パック)/, unit: "パック" },
    { regex: /(\d+(?:\/\d+)?)\s*(丁)/, unit: "丁" },
    { regex: /(\d+(?:\/\d+)?)\s*(合)/, unit: "合" },
    { regex: /(\d+(?:\/\d+)?)\s*(房)/, unit: "房" },
    { regex: /(\d+(?:\/\d+)?)\s*(玉)/, unit: "玉" },
    { regex: /(\d+(?:\/\d+)?)\s*(株)/, unit: "株" },
    { regex: /(\d+(?:\/\d+)?)\s*(缶)/, unit: "缶" },
  ];

  for (const { regex, unit } of unitPatterns) {
    const match = str.match(regex);
    if (match) {
      const amountStr = match[1];
      if (amountStr.includes("/")) {
        const [num, den] = amountStr.split("/").map(Number);
        result.amount = num / den;
      } else {
        result.amount = parseFloat(amountStr);
      }
      result.unit = unit;
      result.name = str.replace(match[0], "").trim();
      if (!result.name) result.name = str.trim();
      return result;
    }
  }

  // 「少々」「適量」「ひとつまみ」などはそのまま単位として扱う
  const vaguePatterns = [
    { regex: /(少々)/, unit: "少々" },
    { regex: /(適量)/, unit: "適量" },
    { regex: /(ひとつまみ)/, unit: "ひとつまみ" },
    { regex: /(お好みで)/, unit: "お好みで" },
    { regex: /(適宜)/, unit: "適宜" },
  ];

  for (const { regex, unit } of vaguePatterns) {
    const match = str.match(regex);
    if (match) {
      result.unit = unit;
      result.name = str.replace(match[0], "").trim();
      if (!result.name) result.name = str.trim();
      return result;
    }
  }

  // 名前のクリーンアップ（数量部分を除去）
  result.name = result.name.replace(/^\d+(?:\.\d+)?\s*/, "").trim();
  if (!result.name) result.name = str.trim();

  return result;
}

// AIやJSON-LDから取得した食材データを正規化するヘルパー関数
function normalizeIngredients(ingredients) {
  if (!ingredients || !Array.isArray(ingredients)) return [];
  return ingredients.map(ing => {
    const hasAmount = ing.amount !== undefined && ing.amount !== null && ing.amount !== "" && ing.amount !== 0;
    const hasUnit = ing.unit && ing.unit.trim() !== "";
    // amountとunitが空の場合、nameを再解析して数量を抽出
    if (!hasAmount && !hasUnit && ing.name) {
      const parsed = parseIngredientString(ing.name);
      return {
        name: parsed.name || ing.name,
        amount: parsed.amount !== "" ? parsed.amount : "",
        unit: parsed.unit || ""
      };
    }
    return {
      name: ing.name || "",
      amount: hasAmount ? ing.amount : "",
      unit: ing.unit || ""
    };
  });
}

function buildRecipeParsePrompt(html) {
  return `以下のHTMLからレシピ情報を抽出してJSON形式で返してください。

必ず以下の形式のJSONのみを返してください（説明不要）:
{"name":"レシピ名","servings":2,"ingredients":[{"name":"食材名","amount":200,"unit":"g"}],"instructions":"1. 手順1\\n2. 手順2"}

注意:
- nameはレシピのタイトル（必須）
- servingsは基準人数（整数）
- amountは数量、unitは単位（g, ml, 個, 本, 片, かけ, 枚, 大さじ, 小さじ等）
- 「適量」「少々」などは数量を省略
- instructionsは調理手順（番号付きで改行区切り）
- JSONのみ返すこと

HTML:
${html.slice(0, 8000)}`;
}

function buildTextParsePrompt(text) {
  return `以下のテキストからレシピ情報を抽出してJSON形式で返してください。
ツイートやSNS投稿の場合、スレッド全体から材料と手順を集めてください。

必ず以下の形式のJSONのみを返してください（説明不要）:
{"name":"レシピ名","servings":2,"ingredients":[{"name":"食材名","amount":200,"unit":"g"}],"instructions":"1. 手順1\\n2. 手順2"}

注意:
- nameは料理名（必須、テキストから推測）
- servingsは基準人数（整数、不明なら2）
- amountは数量、unitは単位（g, ml, 個, 本, 片, かけ, 枚, 大さじ, 小さじ等）
- 「適量」「少々」などは数量を省略
- instructionsは調理手順（番号付きで改行区切り）
- JSONのみ返すこと

テキスト:
${text.slice(0, 4000)}`;
}

async function parseTextWithOllama(text, statusEl) {
  showLoading("テキストを解析中...");

  try {
    const prompt = buildTextParsePrompt(text);
    const recipe = await callOllamaApi(prompt);
    return recipe;
  } catch (error) {
    throw new Error("テキストの解析に失敗しました: " + error.message);
  } finally {
    hideLoading();
  }
}

async function callOllamaApi(prompt) {
  const response = await fetch(OLLAMA_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      prompt: prompt,
      stream: false
    })
  });

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.response || "";

  // JSONを抽出
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("レシピ情報を抽出できませんでした");
  }

  return JSON.parse(jsonMatch[0]);
}

async function fetchAndParseRecipe(url, statusEl) {
  showLoading("URLを取得中...");

  try {
    const urlData = await fetchUrlContent(url);

    // 1. まずJSON-LDを試す（高速・正確）
    showLoading("レシピデータを検索中...");
    const jsonLdRecipe = extractRecipeFromJsonLd(urlData.content);

    if (jsonLdRecipe && jsonLdRecipe.name) {
      setFetchStatus(statusEl, "success", "JSON-LDから取得しました");
      return jsonLdRecipe;
    }

    // 2. JSON-LDがなければOllamaで解析
    showLoading("AIで解析中（ローカル）...");

    const prompt = buildRecipeParsePrompt(urlData.content);
    const recipe = await callOllamaApi(prompt);
    return recipe;
  } catch (error) {
    throw new Error("レシピの解析に失敗しました: " + error.message);
  } finally {
    hideLoading();
  }
}

function setFetchStatus(el, type, message) {
  if (!el) return;
  el.textContent = message;
  el.className = "form-field__help";
  if (type === "loading") {
    el.classList.add("form-field__help--loading");
  } else if (type === "error") {
    el.classList.add("form-field__help--error");
  } else if (type === "success") {
    el.classList.add("form-field__help--success");
  }
}

function clearFetchStatus(el) {
  if (!el) return;
  el.textContent = "";
  el.className = "form-field__help";
}

async function handleRecipeFetch(urlInput, nameInput, servingsInput, ingredientListEl, instructionsInput, statusEl) {
  const url = urlInput.value.trim();
  if (!url) {
    setFetchStatus(statusEl, "error", "URLを入力してください");
    return;
  }

  try {
    const recipe = await fetchAndParseRecipe(url, statusEl);

    // Fill form fields - always update recipe name from parsed data
    if (recipe.name) {
      nameInput.value = recipe.name;
    }

    if (recipe.servings) {
      const servings = normalizeBaseServings(recipe.servings);
      servingsInput.value = String(servings);
    }

    if (recipe.ingredients && recipe.ingredients.length > 0) {
      resetIngredientList(ingredientListEl, normalizeIngredients(recipe.ingredients));
    }

    if (recipe.instructions && instructionsInput) {
      instructionsInput.value = recipe.instructions;
    }

    setFetchStatus(statusEl, "success", "レシピを取得しました");
    setTimeout(() => clearFetchStatus(statusEl), 3000);
  } catch (error) {
    setFetchStatus(statusEl, "error", error.message || "取得に失敗しました");
  }
}

// --- End Recipe Fetch ---

function startEditingRecipe(recipe) {
  editingRecipeId = recipe.id;
  recipeFormTitle.textContent = "レシピを編集";
  recipeSaveButton.textContent = "更新";
  recipeCancelButton.hidden = false;
  fillRecipeForm(recipe);
}

function renderRecipeList() {
  const query = recipeSearchInput.value.trim();
  let list = query ? searchRecipes(query) : recipeDb.slice();

  // タグフィルターが有効な場合はフィルタリング
  if (activeTagFilter) {
    list = list.filter(recipe =>
      recipe.tags && recipe.tags.includes(activeTagFilter)
    );
  }

  recipeList.innerHTML = "";

  if (list.length === 0) {
    recipeEmpty.hidden = false;
    recipeEmpty.textContent = activeTagFilter
      ? `「${activeTagFilter}」タグのメニューはありません`
      : "まだメニューがありません";
    return;
  }
  recipeEmpty.hidden = true;

  list.forEach((recipe) => {
    const card = document.createElement("article");
    card.className = "recipe-card recipe-card--compact";

    // クリック可能なエリア（タイトル + サマリー）
    const clickable = document.createElement("div");
    clickable.className = "recipe-card__clickable";
    clickable.addEventListener("click", () => {
      const detailEl = card.querySelector(".recipe-card__detail");
      if (detailEl) {
        detailEl.hidden = !detailEl.hidden;
        card.classList.toggle("recipe-card--expanded", !detailEl.hidden);
      }
    });

    const title = document.createElement("h3");
    title.className = "recipe-card__title";
    title.textContent = recipe.name;
    clickable.appendChild(title);

    // タグ表示
    if (recipe.tags && recipe.tags.length > 0) {
      const tagsEl = document.createElement("div");
      tagsEl.className = "recipe-card__tags";
      recipe.tags.forEach(tag => {
        const tagEl = document.createElement("span");
        tagEl.className = "tag tag--small";
        tagEl.textContent = tag;
        tagEl.addEventListener("click", (e) => {
          e.stopPropagation();
          activeTagFilter = tag;
          renderTagFilter();
          renderRecipeList();
        });
        tagsEl.appendChild(tagEl);
      });
      clickable.appendChild(tagsEl);
    }

    // 簡易情報（食材数 + 基準人数）
    const summary = document.createElement("p");
    summary.className = "recipe-card__summary";
    const ingredientCount = recipe.ingredients.length;
    const servingsText = `${formatNumber(normalizeBaseServings(recipe.baseServings))}人前`;
    const ingredientText = ingredientCount > 0 ? `食材${ingredientCount}種` : "食材未登録";
    summary.textContent = `${servingsText} ・ ${ingredientText}`;
    clickable.appendChild(summary);

    card.appendChild(clickable);

    // アクションボタン（編集・削除のみ）
    const actions = document.createElement("div");
    actions.className = "recipe-card__actions";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "button--ghost button--small";
    editButton.textContent = "編集";
    editButton.addEventListener("click", (e) => {
      e.stopPropagation();
      startEditingRecipe(recipe);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "button--ghost button--small button--danger";
    deleteButton.textContent = "削除";
    deleteButton.addEventListener("click", (e) => {
      e.stopPropagation();
      const ok = window.confirm(`「${recipe.name}」を削除しますか？`);
      if (!ok) {
        return;
      }
      recipeDb = recipeDb.filter((entry) => entry.id !== recipe.id);
      saveRecipeDb();
      renderRecipeList();
      renderWeek(currentWeekStart);
    });

    actions.appendChild(editButton);
    actions.appendChild(deleteButton);
    card.appendChild(actions);

    // 詳細（初期は非表示）
    const detail = document.createElement("div");
    detail.className = "recipe-card__detail";
    detail.hidden = true;

    // URL
    if (recipe.url) {
      const urlEl = document.createElement("a");
      urlEl.className = "recipe-card__url";
      urlEl.href = recipe.url;
      urlEl.target = "_blank";
      urlEl.rel = "noreferrer";
      urlEl.textContent = "レシピページを開く →";
      detail.appendChild(urlEl);
    }

    // 食材リスト
    if (recipe.ingredients.length > 0) {
      const ingredientsSection = document.createElement("div");
      ingredientsSection.className = "recipe-card__section";
      const ingredientsTitle = document.createElement("p");
      ingredientsTitle.className = "recipe-card__section-title";
      ingredientsTitle.textContent = "食材";
      ingredientsSection.appendChild(ingredientsTitle);

      const listEl = document.createElement("ul");
      listEl.className = "recipe-card__ingredients";
      recipe.ingredients.forEach((ingredient) => {
        const item = document.createElement("li");
        item.textContent = formatIngredientDisplay(ingredient);
        listEl.appendChild(item);
      });
      ingredientsSection.appendChild(listEl);
      detail.appendChild(ingredientsSection);
    }

    // 作り方
    if (recipe.instructions) {
      const instructionsSection = document.createElement("div");
      instructionsSection.className = "recipe-card__section";
      const instructionsTitle = document.createElement("p");
      instructionsTitle.className = "recipe-card__section-title";
      instructionsTitle.textContent = "作り方";
      instructionsSection.appendChild(instructionsTitle);
      const instructionsText = document.createElement("pre");
      instructionsText.className = "recipe-card__instructions-text";
      instructionsText.textContent = recipe.instructions;
      instructionsSection.appendChild(instructionsText);
      detail.appendChild(instructionsSection);
    }

    card.appendChild(detail);
    recipeList.appendChild(card);
  });
}

function openRecipesView({ scroll } = { scroll: true }) {
  landingSection.hidden = true;
  appSection.hidden = true;
  recipesSection.hidden = false;
  renderTagFilter();
  renderRecipeList();
  if (scroll) {
    recipesSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function openAppView({ scroll } = { scroll: true }) {
  landingSection.hidden = true;
  appSection.hidden = false;
  recipesSection.hidden = true;
  if (scroll) {
    appSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function openLandingView() {
  landingSection.hidden = false;
  appSection.hidden = true;
  recipesSection.hidden = true;
}

function syncViewFromHash() {
  if (window.location.hash === "#app") {
    openAppView({ scroll: false });
    return;
  }
  if (window.location.hash === "#recipes") {
    openRecipesView({ scroll: false });
    return;
  }
  if (window.location.hash === "#landing") {
    openLandingView();
    return;
  }
  openAppView({ scroll: false });
}

function renderSearchResults({ query, container, dayKey, dishId }) {
  container.innerHTML = "";
  const trimmed = query.trim();

  // クエリが空の場合は全レシピを表示（最大8件）
  const matches = trimmed
    ? searchRecipes(trimmed).slice(0, 6)
    : recipeDb.slice(0, 8);
  const exactMatch = trimmed ? getRecipeByName(trimmed) : null;

  // レシピがない場合はヒントを表示
  if (recipeDb.length === 0 && !trimmed) {
    container.hidden = true;
    return;
  }

  container.hidden = false;

  // 空クエリで候補がある場合、ヘッダーを表示
  if (!trimmed && matches.length > 0) {
    const header = document.createElement("div");
    header.className = "recipe-search__header";
    header.textContent = "登録済みのレシピ";
    container.appendChild(header);
  }

  if (matches.length === 0) {
    const empty = document.createElement("div");
    empty.className = "recipe-detail__notice";
    empty.textContent = "該当するレシピがありません。";
    container.appendChild(empty);
  } else {
    matches.forEach((recipe) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "recipe-search__item";
      item.textContent = recipe.name;

      if (recipe.ingredients.length > 0) {
        const meta = document.createElement("span");
        meta.className = "recipe-search__meta";
        meta.textContent = recipe.ingredients
          .slice(0, 2)
          .map(formatIngredientDisplay)
          .join(" / ");
        item.appendChild(meta);
      }

      item.addEventListener("click", () => {
        selectRecipeForDish(dayKey, dishId, recipe);
      });

      container.appendChild(item);
    });
  }

  if (trimmed && !exactMatch) {
    const createButton = document.createElement("button");
    createButton.type = "button";
    createButton.className = "recipe-search__item recipe-search__item--create";
    createButton.textContent = `「${trimmed}」を新規登録`;
    createButton.addEventListener("click", () => {
      openRecipeModal({ dayKey, dishId, name: trimmed });
    });
    container.appendChild(createButton);
  }
}

/**
 * 統合された料理カード（レシピ選択済みの場合のみ）
 * コンパクト表示 + クリックで詳細展開
 */
function renderUnifiedDishCard({ dish, recipe, dayKey }) {
  const card = document.createElement("div");
  card.className = "unified-dish-card";

  // コンパクト表示（クリックで詳細展開）
  const compact = document.createElement("div");
  compact.className = "unified-dish-card__compact";
  compact.addEventListener("click", () => {
    const expandedEl = card.querySelector(".unified-dish-card__expanded");
    if (expandedEl) {
      expandedEl.hidden = !expandedEl.hidden;
      card.classList.toggle("unified-dish-card--expanded", !expandedEl.hidden);
    }
  });

  const name = document.createElement("span");
  name.className = "unified-dish-card__name";
  name.textContent = recipe.name;
  compact.appendChild(name);

  const indicator = document.createElement("span");
  indicator.className = "unified-dish-card__indicator";
  indicator.textContent = "▼";
  compact.appendChild(indicator);

  card.appendChild(compact);

  // 詳細部分（初期は非表示）
  const expanded = document.createElement("div");
  expanded.className = "unified-dish-card__expanded";
  expanded.hidden = true;

  const baseServings = normalizeBaseServings(recipe.baseServings);
  const meta = document.createElement("p");
  meta.className = "unified-dish-card__meta";
  meta.textContent = `基準: ${formatNumber(baseServings)}人前`;
  expanded.appendChild(meta);

  if (recipe.url) {
    const link = document.createElement("a");
    link.className = "unified-dish-card__link";
    link.href = recipe.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = "レシピページを開く";
    link.addEventListener("click", (e) => e.stopPropagation());
    expanded.appendChild(link);
  }

  if (recipe.ingredients.length > 0) {
    const ingredientsSection = document.createElement("div");
    ingredientsSection.className = "unified-dish-card__section";
    const ingredientsTitle = document.createElement("p");
    ingredientsTitle.className = "unified-dish-card__section-title";
    ingredientsTitle.textContent = "食材";
    ingredientsSection.appendChild(ingredientsTitle);

    const listEl = document.createElement("ul");
    listEl.className = "unified-dish-card__ingredients";
    recipe.ingredients.forEach((ingredient) => {
      const item = document.createElement("li");
      item.textContent = formatIngredientDisplay(ingredient);
      listEl.appendChild(item);
    });
    ingredientsSection.appendChild(listEl);
    expanded.appendChild(ingredientsSection);
  }

  if (recipe.instructions) {
    const instructionsSection = document.createElement("div");
    instructionsSection.className = "unified-dish-card__section";
    const instructionsTitle = document.createElement("p");
    instructionsTitle.className = "unified-dish-card__section-title";
    instructionsTitle.textContent = "作り方";
    instructionsSection.appendChild(instructionsTitle);
    const instructionsText = document.createElement("pre");
    instructionsText.className = "unified-dish-card__instructions";
    instructionsText.textContent = recipe.instructions;
    instructionsSection.appendChild(instructionsText);
    expanded.appendChild(instructionsSection);
  }

  const actions = document.createElement("div");
  actions.className = "unified-dish-card__actions";

  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.className = "button--ghost button--small";
  clearButton.textContent = "解除";
  clearButton.addEventListener("click", (e) => {
    e.stopPropagation();
    clearDishSelection(dayKey, dish.id);
  });

  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.className = "button--ghost button--small";
  editButton.textContent = "編集";
  editButton.addEventListener("click", (e) => {
    e.stopPropagation();
    openRecipesView({ scroll: true });
    history.replaceState(null, "", "#recipes");
    startEditingRecipe(recipe);
  });

  actions.appendChild(clearButton);
  actions.appendChild(editButton);
  expanded.appendChild(actions);

  card.appendChild(expanded);

  return card;
}

function renderServingControl({ dish, recipe }) {
  const wrapper = document.createElement("label");
  wrapper.className = "servings-field";

  const label = document.createElement("span");
  label.textContent = "この品は何人前";
  wrapper.appendChild(label);

  const input = document.createElement("input");
  input.type = "number";
  input.min = "1";
  input.step = "1";

  if (recipe) {
    const baseServings = normalizeBaseServings(recipe.baseServings);
    const servingsValue = resolveDishServings(dish, recipe);
    input.value = servingsValue ? formatNumber(servingsValue) : formatNumber(baseServings);
    input.placeholder = formatNumber(baseServings);
  } else {
    input.disabled = true;
    input.placeholder = "-";
  }

  input.addEventListener("input", () => {
    if (!recipe) {
      return;
    }
    const value = normalizeNumber(input.value);
    if (value > 0) {
      dish.servings = value;
    } else {
      delete dish.servings;
    }
    scheduleSave();
    renderShoppingList();
  });

  input.addEventListener("blur", () => {
    if (!recipe) {
      return;
    }
    if (!input.value) {
      const baseServings = normalizeBaseServings(recipe.baseServings);
      dish.servings = baseServings;
      input.value = formatNumber(baseServings);
      scheduleSave();
      renderShoppingList();
    }
  });

  wrapper.appendChild(input);

  if (!recipe) {
    const hint = document.createElement("span");
    hint.className = "servings-field__hint";
    hint.textContent = "レシピ選択後に入力";
    wrapper.appendChild(hint);
  }

  return wrapper;
}

function renderWeek(weekStart) {
  currentWeekStart = weekStart;
  currentData = loadWeekData(weekStart);
  weekStartInput.value = formatDate(weekStart);

  const endDate = new Date(weekStart);
  endDate.setDate(endDate.getDate() + 6);
  weekRange.textContent = `${formatDisplayDate(weekStart)} - ${formatDisplayDate(endDate)}`;

  weekGrid.innerHTML = "";

  for (let index = 0; index < 7; index += 1) {
    const date = new Date(weekStart);
    date.setDate(date.getDate() + index);
    const dateKey = formatDate(date);
    const dayData = getDayData(dateKey);

    const card = document.createElement("article");
    card.className = "day-card";
    card.style.setProperty("--delay", `${index * 0.06}s`);

    const header = document.createElement("div");
    header.className = "day-header";

    const title = document.createElement("h2");
    title.className = "day-title";
    title.textContent = DAY_LABELS[index];

    const dateLabel = document.createElement("span");
    dateLabel.className = "day-date";
    dateLabel.textContent = formatDisplayDate(date);

    header.appendChild(title);
    header.appendChild(dateLabel);
    card.appendChild(header);

    const dishList = document.createElement("div");
    dishList.className = "dish-list";

    dayData.dishes.forEach((dish, dishIndex) => {
      const selectedRecipe = dish.recipeId ? getRecipeById(dish.recipeId) : null;

      const dishCard = document.createElement("div");
      dishCard.className = "dish-card";

      const dishHeader = document.createElement("div");
      dishHeader.className = "dish-card__header";

      const dishTitle = document.createElement("span");
      dishTitle.className = "dish-card__title";
      dishTitle.textContent = `品目 ${dishIndex + 1}`;

      const dishActions = document.createElement("div");
      dishActions.className = "dish-card__actions";
      if (dayData.dishes.length > 1) {
        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "button--ghost button--small";
        removeButton.textContent = "削除";
        removeButton.addEventListener("click", () => {
          removeDish(dateKey, dish.id);
        });
        dishActions.appendChild(removeButton);
      }

      dishHeader.appendChild(dishTitle);
      dishHeader.appendChild(dishActions);
      dishCard.appendChild(dishHeader);

      // レシピが選択されている場合は統合されたコンパクトカードを表示
      if (selectedRecipe) {
        dishCard.appendChild(renderUnifiedDishCard({ dish, recipe: selectedRecipe, dayKey: dateKey }));
        dishCard.appendChild(renderServingControl({ dish, recipe: selectedRecipe }));
      } else if (dish.recipeId && !selectedRecipe) {
        // レシピIDはあるが、レシピが削除されている場合
        const deletedNotice = document.createElement("div");
        deletedNotice.className = "dish-deleted-notice";

        const message = document.createElement("p");
        message.textContent = "レシピが削除されています";
        deletedNotice.appendChild(message);

        const clearButton = document.createElement("button");
        clearButton.type = "button";
        clearButton.className = "button--ghost button--small";
        clearButton.textContent = "解除";
        clearButton.addEventListener("click", () => {
          clearDishSelection(dateKey, dish.id);
        });
        deletedNotice.appendChild(clearButton);

        dishCard.appendChild(deletedNotice);
      } else {
        // レシピ未選択の場合は検索入力欄を表示
        const searchWrapper = document.createElement("div");
        searchWrapper.className = "recipe-search";

        const label = document.createElement("label");
        label.textContent = "料理名";

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "料理名を入力";
        if (dish.draftName) {
          input.value = dish.draftName;
        }

        const results = document.createElement("div");
        results.className = "recipe-search__results";
        results.hidden = true;

        input.addEventListener("input", () => {
          dish.draftName = input.value;
          scheduleSave();
          renderSearchResults({
            query: input.value,
            container: results,
            dayKey: dateKey,
            dishId: dish.id,
          });
        });

        input.addEventListener("focus", () => {
          renderSearchResults({
            query: input.value,
            container: results,
            dayKey: dateKey,
            dishId: dish.id,
          });
        });

        input.addEventListener("keydown", (event) => {
          if (event.key !== "Enter") {
            return;
          }
          const trimmed = input.value.trim();
          if (!trimmed) {
            return;
          }
          event.preventDefault();
          dish.draftName = trimmed;
          const existing = getRecipeByName(trimmed);
          if (existing) {
            selectRecipeForDish(dateKey, dish.id, existing);
            return;
          }
          openRecipeModal({ dayKey: dateKey, dishId: dish.id, name: trimmed });
        });

        searchWrapper.appendChild(label);
        searchWrapper.appendChild(input);
        searchWrapper.appendChild(results);

        dishCard.appendChild(searchWrapper);

        // 下書き状態の場合のヒント
        if (dish.draftName) {
          const hint = document.createElement("p");
          hint.className = "recipe-detail__notice";
          hint.textContent = "Enterで確定、または候補から選択";
          dishCard.appendChild(hint);
        }
      }

      dishList.appendChild(dishCard);
    });

    card.appendChild(dishList);

    const addDishButton = document.createElement("button");
    addDishButton.type = "button";
    addDishButton.className = "button--ghost button--small dish-add";
    addDishButton.textContent = "+ 品目を追加";
    addDishButton.addEventListener("click", () => {
      dayData.dishes.push(createDishEntry());
      commitSave();
      renderWeek(currentWeekStart);
    });
    card.appendChild(addDishButton);

    weekGrid.appendChild(card);
  }

  renderShoppingList();
  setSaveStatus("保存済み");
}

function renderShoppingList() {
  const checkedState = getShoppingState();
  // Key: "食材名|単位" で集計（同じ名前でも単位が違えば別エントリ）
  const totals = new Map();
  const orderedKeys = [];

  for (let index = 0; index < 7; index += 1) {
    const date = new Date(currentWeekStart);
    date.setDate(date.getDate() + index);
    const dateKey = formatDate(date);
    const dayData = getDayData(dateKey);
    dayData.dishes.forEach((dish) => {
      if (!dish.recipeId) {
        return;
      }
      const recipe = getRecipeById(dish.recipeId);
      if (!recipe) {
        return;
      }
      const baseServings = normalizeBaseServings(recipe.baseServings);
      const servings = resolveDishServings(dish, recipe);
      const multiplier = servings / baseServings;
      recipe.ingredients.forEach((ingredient) => {
        const name = ingredient.name.trim();
        if (!name) {
          return;
        }
        const amount = normalizeNumber(ingredient.amount);
        const unit = String(ingredient.unit || "").trim();
        // 同じ名前 + 同じ単位 で集計
        const key = `${normalizeText(name)}|${unit.toLowerCase()}`;
        if (!totals.has(key)) {
          totals.set(key, { name, amount: 0, unit });
          orderedKeys.push(key);
        }
        const entry = totals.get(key);
        entry.amount += amount * multiplier;
      });
    });
  }

  Object.keys(checkedState).forEach((key) => {
    if (!totals.has(key)) {
      delete checkedState[key];
    }
  });

  shoppingList.innerHTML = "";

  if (orderedKeys.length === 0) {
    shoppingEmpty.hidden = false;
    return;
  }
  shoppingEmpty.hidden = true;

  orderedKeys.forEach((key) => {
    const itemData = totals.get(key);
    const listItem = document.createElement("li");
    listItem.className = "checklist__item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checklist__toggle";
    checkbox.checked = Boolean(checkedState[key]);
    checkbox.addEventListener("change", () => {
      checkedState[key] = checkbox.checked;
      listItem.classList.toggle("checklist__item--checked", checkbox.checked);
      scheduleSave();
    });

    const text = document.createElement("span");
    text.className = "checklist__text";
    text.textContent = itemData.name;

    listItem.appendChild(checkbox);
    listItem.appendChild(text);

    if (itemData.amount > 0) {
      const amountBadge = document.createElement("span");
      amountBadge.className = "checklist__count";
      if (itemData.unit) {
        amountBadge.textContent = `${formatNumber(itemData.amount)}${itemData.unit}`;
      } else {
        amountBadge.textContent = `${formatNumber(itemData.amount)}`;
      }
      listItem.appendChild(amountBadge);
    }

    if (checkbox.checked) {
      listItem.classList.add("checklist__item--checked");
    }

    shoppingList.appendChild(listItem);
  });
}

function shiftWeek(offset) {
  const next = new Date(currentWeekStart);
  next.setDate(next.getDate() + offset * 7);
  renderWeek(startOfWeek(next));
}

weekStartInput.addEventListener("change", (event) => {
  if (!event.target.value) {
    return;
  }
  const selected = new Date(`${event.target.value}T00:00:00`);
  renderWeek(startOfWeek(selected));
});

prevWeekButton.addEventListener("click", () => shiftWeek(-1));
nextWeekButton.addEventListener("click", () => shiftWeek(1));
thisWeekButton.addEventListener("click", () => renderWeek(startOfWeek(new Date())));

clearWeekButton.addEventListener("click", () => {
  const label = formatDisplayDate(currentWeekStart);
  const ok = window.confirm(`${label}の週をクリアしますか？`);
  if (!ok) {
    return;
  }
  localStorage.removeItem(storageKey(currentWeekStart));
  renderWeek(currentWeekStart);
});

ingredientAddButton.addEventListener("click", () => addIngredientRow());
recipeModalIngredientAddButton.addEventListener("click", () => {
  createIngredientRow(recipeModalIngredientList);
});

// タグ入力のセットアップ
setupTagInput(recipeTagInput, recipeTagList, currentTags, () => {});
setupTagInput(recipeModalTagInput, recipeModalTagList, modalTags, () => {});

// Recipe fetch from URL buttons
recipeFetchButton.addEventListener("click", () => {
  handleRecipeFetch(
    recipeUrlInput,
    recipeNameInput,
    recipeServingsInput,
    ingredientList,
    recipeInstructionsInput,
    recipeFetchStatus
  );
});

recipeModalFetchButton.addEventListener("click", () => {
  handleRecipeFetch(
    recipeModalUrlInput,
    recipeModalNameInput,
    recipeModalServingsInput,
    recipeModalIngredientList,
    recipeModalInstructionsInput,
    recipeModalFetchStatus
  );
});

// Text parse toggle and buttons
recipeTextToggle.addEventListener("click", () => {
  recipeTextArea.hidden = !recipeTextArea.hidden;
});

recipeModalTextToggle.addEventListener("click", () => {
  recipeModalTextArea.hidden = !recipeModalTextArea.hidden;
});

recipeTextParse.addEventListener("click", async () => {
  const text = recipeTextInput.value.trim();
  if (!text) {
    setFetchStatus(recipeFetchStatus, "error", "テキストを入力してください");
    return;
  }
  try {
    const recipe = await parseTextWithOllama(text, recipeFetchStatus);
    if (recipe.name) {
      recipeNameInput.value = recipe.name;
    }
    if (recipe.servings) {
      recipeServingsInput.value = String(normalizeBaseServings(recipe.servings));
    }
    if (recipe.ingredients && recipe.ingredients.length > 0) {
      resetIngredientList(ingredientList, normalizeIngredients(recipe.ingredients));
    }
    if (recipe.instructions) {
      recipeInstructionsInput.value = recipe.instructions;
    }
    setFetchStatus(recipeFetchStatus, "success", "テキストから取得しました");
    setTimeout(() => clearFetchStatus(recipeFetchStatus), 3000);
  } catch (error) {
    setFetchStatus(recipeFetchStatus, "error", error.message);
  }
});

recipeModalTextParse.addEventListener("click", async () => {
  const text = recipeModalTextInput.value.trim();
  if (!text) {
    setFetchStatus(recipeModalFetchStatus, "error", "テキストを入力してください");
    return;
  }
  try {
    const recipe = await parseTextWithOllama(text, recipeModalFetchStatus);
    if (recipe.name) {
      recipeModalNameInput.value = recipe.name;
    }
    if (recipe.servings) {
      recipeModalServingsInput.value = String(normalizeBaseServings(recipe.servings));
    }
    if (recipe.ingredients && recipe.ingredients.length > 0) {
      resetIngredientList(recipeModalIngredientList, normalizeIngredients(recipe.ingredients));
    }
    if (recipe.instructions) {
      recipeModalInstructionsInput.value = recipe.instructions;
    }
    setFetchStatus(recipeModalFetchStatus, "success", "テキストから取得しました");
    setTimeout(() => clearFetchStatus(recipeModalFetchStatus), 3000);
  } catch (error) {
    setFetchStatus(recipeModalFetchStatus, "error", error.message);
  }
});

recipeModalBackdrop.addEventListener("click", () => closeRecipeModal());
recipeModalCloseButton.addEventListener("click", () => closeRecipeModal());
recipeModalCancelButton.addEventListener("click", () => closeRecipeModal());

recipeModalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = recipeModalNameInput.value.trim();
  if (!name) {
    recipeModalNameInput.focus();
    return;
  }

  const url = recipeModalUrlInput.value.trim();
  const ingredients = collectIngredientsFrom(recipeModalIngredientList);
  const instructions = recipeModalInstructionsInput.value.trim();
  const baseServings = normalizeBaseServings(recipeModalServingsInput.value);
  const tags = [...modalTags];
  const now = new Date().toISOString();
  const existing = getRecipeByName(name);
  let targetRecipe = null;

  if (existing) {
    recipeDb = recipeDb.map((recipe) =>
      recipe.id === existing.id
        ? { ...recipe, name, url, ingredients, instructions, baseServings, tags, updatedAt: now }
        : recipe,
    );
    targetRecipe = { id: existing.id, baseServings };
  } else {
    targetRecipe = {
      id: `recipe-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      name,
      url,
      ingredients,
      instructions,
      baseServings,
      tags,
      createdAt: now,
      updatedAt: now,
    };
    recipeDb.push(targetRecipe);
  }

  saveRecipeDb();
  renderRecipeList();
  renderTagFilter();

  if (modalDayKey && modalDishId) {
    selectRecipeForDish(modalDayKey, modalDishId, targetRecipe);
  } else {
    renderWeek(currentWeekStart);
  }
  closeRecipeModal();
});

window.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }
  if (!recipeModal.hidden) {
    closeRecipeModal();
  }
});

recipeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = recipeNameInput.value.trim();
  if (!name) {
    recipeNameInput.focus();
    return;
  }

  const url = recipeUrlInput.value.trim();
  const ingredients = collectIngredients();
  const instructions = recipeInstructionsInput.value.trim();
  const baseServings = normalizeBaseServings(recipeServingsInput.value);
  const tags = [...currentTags];
  const now = new Date().toISOString();

  if (editingRecipeId) {
    recipeDb = recipeDb.map((recipe) =>
      recipe.id === editingRecipeId
        ? { ...recipe, name, url, ingredients, instructions, baseServings, tags, updatedAt: now }
        : recipe,
    );
  } else {
    recipeDb.push({
      id: `recipe-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
      name,
      url,
      ingredients,
      instructions,
      baseServings,
      tags,
      createdAt: now,
      updatedAt: now,
    });
  }

  saveRecipeDb();
  resetRecipeForm();
  renderRecipeList();
  renderTagFilter();
  renderWeek(currentWeekStart);
});

recipeCancelButton.addEventListener("click", () => {
  resetRecipeForm();
});

recipeSearchInput.addEventListener("input", renderRecipeList);

enterAppButton.addEventListener("click", () => {
  openAppView({ scroll: true });
  history.replaceState(null, "", "#app");
});

enterRecipesButton.addEventListener("click", () => {
  openRecipesView({ scroll: true });
  history.replaceState(null, "", "#recipes");
});

backToLandingButton.addEventListener("click", () => {
  openLandingView();
  history.replaceState(null, "", "#landing");
});

openRecipesFromAppButton.addEventListener("click", () => {
  openRecipesView({ scroll: true });
  history.replaceState(null, "", "#recipes");
});

backToLandingFromRecipesButton.addEventListener("click", () => {
  openLandingView();
  history.replaceState(null, "", "#landing");
});

openAppFromRecipesButton.addEventListener("click", () => {
  openAppView({ scroll: true });
  history.replaceState(null, "", "#app");
});

window.addEventListener("hashchange", syncViewFromHash);

resetRecipeForm();
renderWeek(currentWeekStart);
renderRecipeList();
syncViewFromHash();

// ============================================
// Mobile Navigation & FAB
// ============================================

const mobileNav = document.getElementById("mobileNav");
const fabShopping = document.getElementById("fabShopping");
const fabBadge = document.getElementById("fabBadge");

function isMobileView() {
  return window.innerWidth <= 768;
}

function updateMobileNav(currentView) {
  if (!mobileNav) return;

  // ランディングページではナビを非表示
  if (currentView === "landing") {
    mobileNav.hidden = true;
    if (fabShopping) fabShopping.hidden = true;
    return;
  }

  // モバイルではナビを表示
  mobileNav.hidden = !isMobileView();

  // アクティブなナビアイテムを更新
  const navItems = mobileNav.querySelectorAll(".mobile-nav__item");
  navItems.forEach((item) => {
    const navType = item.dataset.nav;
    const isActive = (currentView === "app" && navType === "kondate") ||
                     (currentView === "recipes" && navType === "recipes") ||
                     (currentView === "shopping" && navType === "shopping");
    if (isActive) {
      item.setAttribute("aria-current", "page");
      item.classList.add("mobile-nav__item--active");
    } else {
      item.removeAttribute("aria-current");
      item.classList.remove("mobile-nav__item--active");
    }
  });

  // FABは献立画面でのみ表示（買い物リストへのショートカット）
  if (fabShopping) {
    fabShopping.hidden = !(isMobileView() && currentView === "app");
  }
}

function scrollToShoppingList() {
  const checklistEl = document.querySelector(".checklist");
  if (checklistEl) {
    checklistEl.scrollIntoView({ behavior: "smooth", block: "start" });
    // フォーカスを移動してスクリーンリーダー対応
    checklistEl.focus({ preventScroll: true });
  }
}

function updateFabBadge() {
  if (!fabBadge || !fabShopping) return;

  // 買い物リストのアイテム数をカウント
  const items = shoppingList.querySelectorAll(".checklist__item");
  const uncheckedCount = Array.from(items).filter(
    (item) => !item.classList.contains("checklist__item--checked")
  ).length;

  if (uncheckedCount > 0) {
    fabBadge.textContent = uncheckedCount;
    fabBadge.hidden = false;
  } else {
    fabBadge.hidden = true;
  }
}

// Mobile nav click handlers
if (mobileNav) {
  mobileNav.addEventListener("click", (event) => {
    const navItem = event.target.closest(".mobile-nav__item");
    if (!navItem) return;

    const navType = navItem.dataset.nav;
    switch (navType) {
      case "kondate":
        openAppView({ scroll: false });
        history.replaceState(null, "", "#app");
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case "shopping":
        // 献立画面に移動してから買い物リストにスクロール
        if (appSection.hidden) {
          openAppView({ scroll: false });
          history.replaceState(null, "", "#app");
        }
        setTimeout(scrollToShoppingList, 100);
        break;
      case "recipes":
        openRecipesView({ scroll: false });
        history.replaceState(null, "", "#recipes");
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
    }
  });
}

// FAB click handler
if (fabShopping) {
  fabShopping.addEventListener("click", scrollToShoppingList);
}

// Override view functions to update mobile nav
const originalOpenAppView = openAppView;
const originalOpenRecipesView = openRecipesView;
const originalOpenLandingView = openLandingView;

function openAppViewWithNav(options) {
  originalOpenAppView.call(this, options);
  updateMobileNav("app");
  setTimeout(updateFabBadge, 100);
}

function openRecipesViewWithNav(options) {
  originalOpenRecipesView.call(this, options);
  updateMobileNav("recipes");
}

function openLandingViewWithNav() {
  originalOpenLandingView.call(this);
  updateMobileNav("landing");
}

// Replace global functions
window.openAppView = openAppViewWithNav;
window.openRecipesView = openRecipesViewWithNav;
window.openLandingView = openLandingViewWithNav;

// Override renderShoppingList to update FAB badge
const originalRenderShoppingList = renderShoppingList;
function renderShoppingListWithBadge() {
  originalRenderShoppingList.call(this);
  updateFabBadge();
}

// Replace the renderShoppingList reference
window.renderShoppingList = renderShoppingListWithBadge;

// Update on resize
window.addEventListener("resize", () => {
  const currentView = !landingSection.hidden ? "landing" :
                      !appSection.hidden ? "app" : "recipes";
  updateMobileNav(currentView);
});

// Initial mobile nav state
function initMobileNav() {
  const currentView = !landingSection.hidden ? "landing" :
                      !appSection.hidden ? "app" : "recipes";
  updateMobileNav(currentView);
  updateFabBadge();
}

// Run after initial render
setTimeout(initMobileNav, 0);
