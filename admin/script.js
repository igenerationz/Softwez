// =========================================
// ADMIN ACCESS PROTECTION
// =========================================

const ADMIN_EMAIL = "igenerationofficial@gmail.com";

(async () => {

    const {
        data: {
            session
        }
    } = await supabaseClient.auth.getSession();


    // No login
    if (!session) {

        window.location.replace("login.html");

        return;
    }


    // Logged-in user's email
    const loggedInEmail =
        session.user?.email?.toLowerCase();


    // Only Admin can access dashboard
    if (
        loggedInEmail !==
        ADMIN_EMAIL.toLowerCase()
    ) {

        await supabaseClient.auth.signOut();

        window.location.replace("login.html");

        return;
    }

})();
const savedAdminSection = localStorage.getItem("softwez_admin_section") || "dashboard";
let tools = [];
let categories = [];
let subcategories = [];

let affiliateLinks =
    JSON.parse(
        localStorage.getItem("softwez_affiliate") || "{}"
    );

let affiliateToolData = {};

let sponsoredTools =
    JSON.parse(
        localStorage.getItem("softwez_sponsored") || "[]"
    );

let sponsoredTotal = 0;

let adNetworks = [];

let pendingSubmissions = [];

let activeSearchQuery = "";

let toolsPage = 0;

let toolsTotal = 0;

const TOOLS_PER_PAGE = 50;
const navItems =
    document.querySelectorAll(".nav-item");
const sections =
    document.querySelectorAll(".admin-section");
const pageTitle =
    document.getElementById("pageTitle");
const addToolButton =
    document.getElementById("addToolButton");
const cancelToolButton =
    document.getElementById("cancelToolButton");
const toolFormCard =
    document.getElementById("toolFormCard");
const toolForm =
    document.getElementById("toolForm");
const toolCategory =
    document.getElementById("toolCategory");
const toolSubcategory =
    document.getElementById("toolSubcategory");
const checkToolUrlButton =
    document.getElementById("checkToolUrlButton");
const toolUrlCheckMessage =
    document.getElementById("toolUrlCheckMessage");
const toolsTableBody =
    document.getElementById("toolsTableBody");
const toolSearch =
    document.getElementById("toolSearch");
const categoryForm =
    document.getElementById("categoryForm");
const categoryName =
    document.getElementById("categoryName");
const subcategoryForm =
    document.getElementById("subcategoryForm");
const subcategoryCategory =
    document.getElementById("subcategoryCategory");
const subcategoryName =
    document.getElementById("subcategoryName");
const categoryAdminList =
    document.getElementById("categoryAdminList");
const sponsoredList =
    document.getElementById("sponsoredList");
const affiliateForm =
    document.getElementById("affiliateForm");
const affiliateTool =
    document.getElementById("affiliateTool");
const affiliateList =
    document.getElementById("affiliateList");
const adNetworkForm =
    document.getElementById("adNetworkForm");
const adNetworkList =
    document.getElementById("adNetworkList");
const pendingSubmissionsBody =
    document.getElementById("pendingSubmissionsBody");
const pendingSubmissionsEmpty =
    document.getElementById("pendingSubmissionsEmpty");
const pendingSubmissionsCount =
    document.getElementById("pendingSubmissions");
const pendingNavCount =
    document.getElementById("pendingNavCount");
const pendingSubmissionCount =
    document.getElementById("pendingSubmissionCount");
function saveData() {
localStorage.setItem(
        "softwez_affiliate",
        JSON.stringify(affiliateLinks)
    );
localStorage.setItem(
        "softwez_sponsored",
        JSON.stringify(sponsoredTools)
    );
localStorage.setItem(
        "softwez_ad_networks",
        JSON.stringify(adNetworks)
    );
}
function openSection(sectionId) {
    localStorage.setItem(
        "softwez_admin_section",
        sectionId
    );

    sections.forEach(section => {
        section.classList.remove("active");
});
navItems.forEach(item => {
        item.classList.remove("active");
});
const targetSection =
        document.getElementById(sectionId);
const targetNav =
        document.querySelector(
            `.nav-item[data-section="${sectionId}"]`
        );
if (targetSection) {
        targetSection.classList.add("active");
}
    if (targetNav) {
        targetNav.classList.add("active");
}
    const titles = {
        dashboard: "Dashboard",
        tools: "Tools",
        "pending-submissions":
            "Pending Submissions",
        categories: "Categories",
        sponsored: "Sponsored",
        affiliate: "Affiliate",
        ads: "Ad Network"
    };
if (pageTitle) {
        pageTitle.textContent =
            titles[sectionId] || "Dashboard";
}
    if (
        sectionId ===
        "pending-submissions"
    ) {
        loadPendingSubmissions();
}
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
openSection(savedAdminSection);
document
    .getElementById("logoutBtn")
    ?.addEventListener("click", async () => {

        await supabaseClient.auth.signOut();

        window.location.href = "login.html";

    });
navItems.forEach(item => {
    item.addEventListener(
        "click",
        () => {
            openSection(
                item.dataset.section
            );
}
    );
});
document
    .querySelectorAll(".quick-action")
    .forEach(button => {
        button.addEventListener(
            "click",
            () => {
                openSection(
                    button.dataset.go
                );
}
        );
});
function showToolForm() {
    if (!toolFormCard) {
        return;
}
    toolFormCard.style.display =
        "block";
if (toolForm) {
        toolForm.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
}
}
function hideToolForm() {
    if (toolFormCard) {
        toolFormCard.style.display =
            "none";
    }

    if (toolForm) {
        toolForm.reset();
    }
}
if (addToolButton) {
    addToolButton.addEventListener(
        "click",
        showToolForm
    );
}
if (cancelToolButton) {
    cancelToolButton.addEventListener(
        "click",
        hideToolForm
    );
}
function renderCategorySelect() {
    if (!toolCategory) return;
toolCategory.innerHTML = `<option value="">Select category</option>`;
categories.forEach(category => {
        const option = document.createElement("option");
option.value = category.name;
option.textContent = category.name;
toolCategory.appendChild(option);
});
    renderToolSubcategorySelect();
}
function renderToolSubcategorySelect() {

    if (!toolSubcategory) {
        return;
    }

    const selectedCategory =
        toolCategory?.value || "";

    toolSubcategory.innerHTML =
        `<option value="">Select subcategory</option>`;

    if (!selectedCategory) {

        toolSubcategory.disabled = true;

        return;
    }

    const category =
        categories.find(
            item =>
                item.name === selectedCategory
        );

    if (!category) {

        toolSubcategory.disabled = true;

        return;
    }
console.log("CATEGORIES:", categories);
console.log("SUBCATEGORIES:", subcategories);
    const categorySubcategories =
        subcategories.filter(
            item =>
                String(item.category_id) ===
                String(category.id)
        );

    if (!categorySubcategories.length) {

        toolSubcategory.innerHTML =
            `<option value="">No subcategories</option>`;

        toolSubcategory.disabled = true;

        return;
    }

    categorySubcategories.forEach(
        subcategory => {

            const option =
                document.createElement("option");

            option.value =
                subcategory.name;

            option.textContent =
                subcategory.name;

            toolSubcategory.appendChild(
                option
            );

        }
    );

    toolSubcategory.disabled = false;
}
function renderSubcategoryCategorySelect() {
    if (!subcategoryCategory) return;
subcategoryCategory.innerHTML = `<option value="">Select category</option>`;
categories.forEach(category => {
        const option = document.createElement("option");
option.value = category.id;
option.textContent = category.name;
subcategoryCategory.appendChild(option);
});
}
if (toolCategory) {
    toolCategory.addEventListener(
        "change",
        renderToolSubcategorySelect
    );
}
let toolUrlApproved = false;

async function checkAdminToolUrl() {
    const linkInput = document.getElementById("toolLink");

    const url = linkInput?.value.trim() || "";

    if (!url) {
        if (toolUrlCheckMessage) {
            toolUrlCheckMessage.textContent =
                "Please enter a website URL.";

            toolUrlCheckMessage.className =
                "url-check-message error";
        }

        toolUrlApproved = false;
        return;
    }

    if (checkToolUrlButton) {
        checkToolUrlButton.disabled = true;
        checkToolUrlButton.textContent = "Checking...";
    }

    toolUrlApproved = false;

    try {
        const {
            data: duplicateTool,
            error
        } = await supabaseClient
            .from("tools")
            .select("id")
            .eq("link", url)
            .limit(1)
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (duplicateTool) {
            if (toolUrlCheckMessage) {
                toolUrlCheckMessage.textContent =
                    "✕ This exact URL already exists.";

                toolUrlCheckMessage.className =
                    "url-check-message error";
            }

            toolUrlApproved = false;

            if (checkToolUrlButton) {
                checkToolUrlButton.disabled = false;
                checkToolUrlButton.textContent = "Check URL";
            }

            return;
        }

        if (toolUrlCheckMessage) {
            toolUrlCheckMessage.textContent =
                "✓ URL is available.";

            toolUrlCheckMessage.className =
                "url-check-message success";
        }

        toolUrlApproved = true;

        if (checkToolUrlButton) {
            checkToolUrlButton.disabled = false;
            checkToolUrlButton.textContent = "Checked";
        }

    } catch (error) {
        console.error(
            "Tool URL check error:",
            error
        );

        if (toolUrlCheckMessage) {
            toolUrlCheckMessage.textContent =
                "Could not check this URL.";

            toolUrlCheckMessage.className =
                "url-check-message error";
        }

        toolUrlApproved = false;

        if (checkToolUrlButton) {
            checkToolUrlButton.disabled = false;
            checkToolUrlButton.textContent = "Check URL";
        }
    }
}

if (checkToolUrlButton) {
    checkToolUrlButton.addEventListener(
        "click",
        checkAdminToolUrl
    );
}

if (toolForm) {
    toolForm.addEventListener(
        "submit",
        async event => {
            event.preventDefault();
const name =
                document
                    .getElementById(
                        "toolName"
                    )
                    ?.value
                    .trim() || "";
const description =
                document
                    .getElementById(
                        "toolDescription"
                    )
                    ?.value
                    .trim() || "";
const link =
                document
                    .getElementById(
                        "toolLink"
                    )
                    ?.value
                    .trim() || "";
const category =
                document
                    .getElementById(
                        "toolCategory"
                    )
                    ?.value || "";
const subcategory =
    document
        .getElementById(
            "toolSubcategory"
        )
        ?.value || "";
if (
    !name ||
    !description ||
    !link ||
    !category ||
    !subcategory
) {
                alert(
                    "Please fill in all fields."
                );
return;
}
    try {
const pendingEditingId =
    toolForm.dataset.pendingEditingId;

if (pendingEditingId) {

    const submitButton =
        toolForm.querySelector(
            'button[type="submit"]'
        );

    try {

        const {
            error
        } =
            await supabaseClient
                .from("tool_submissions")
                .update({
                    name,
                    description,
                    url: link,
                    category,
                    subcategory
                })
                .eq(
                    "id",
                    pendingEditingId
                );

        if (error) {
            throw error;
        }

        delete toolForm.dataset.pendingEditingId;

        if (submitButton) {
            submitButton.textContent =
                "Add Tool";
        }

        hideToolForm();

        await loadPendingSubmissions();

        alert(
            "Pending submission updated successfully."
        );

        return;

    } catch (error) {

        console.error(
            "Pending submission update error:",
            error
        );

        alert(
            "Failed to update pending submission.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );

        return;
    }
}

const editingId =
    toolForm.dataset.editingId;

if (editingId) {

    const {
        data: duplicateTool,
        error: duplicateError
    } = await supabaseClient
        .from("tools")
        .select("id")
        .eq("link", link)
        .neq("id", editingId)
        .limit(1)
        .maybeSingle();

    if (duplicateError) {
        throw duplicateError;
    }

    if (duplicateTool) {
        alert(
            "This exact URL already belongs to another tool."
        );
        return;
    }

    const {
        error
    } = await supabaseClient
        .from("tools")
        .update({
            name,
            description,
            link,
            category,
            subcategory
        })
        .eq("id", editingId);

    if (error) {
        throw error;
    }

    delete toolForm.dataset.editingId;

    const submitButton =
        toolForm.querySelector(
            'button[type="submit"]'
        );

    if (submitButton) {
        submitButton.textContent = "Add Tool";
    }

    hideToolForm();

    await loadToolsFromSupabase();

    alert(
        "Tool updated successfully."
    );

    return;
}


// =========================================
// ADD NEW TOOL — DUPLICATE URL CHECK
// =========================================

const {
    data: duplicateTool,
    error: duplicateError
} = await supabaseClient
    .from("tools")
    .select("id")
    .eq("link", link)
    .limit(1)
    .maybeSingle();

if (duplicateError) {
    throw duplicateError;
}

if (duplicateTool) {
    alert(
        "This exact URL already exists."
    );
    return;
}


// =========================================
// INSERT NEW TOOL
// =========================================

const {
    data,
    error
} = await supabaseClient
    .from("tools")
    .insert([
        {
            name,
            description,
            link,
            category,
            subcategory,
            is_sponsored: false
        }
    ])
    .select()
    .single();

if (error) {
    throw error;
}

toolsPage = 0;

await loadToolsFromSupabase();

hideToolForm();

alert(
    "Tool added successfully."
);

} catch (error) {

    console.error(
        "Add tool error:",
        error
    );

    alert(
        "Failed to add tool.\n\n" +
        (
            error?.message ||
            "Unknown error"
        )
    );
}
        }
    );
}

function renderTools() {
    if (!toolsTableBody) {
        return;
    }

    toolsTableBody.innerHTML = "";

    if (!tools.length) {
        toolsTableBody.innerHTML = `
            <tr>
                <td colspan="4">
                    <div class="empty-state">
                        ${
                            activeSearchQuery
                                ? "No tools found."
                                : "No tools available."
                        }
                    </div>
                </td>
            </tr>
        `;

        renderToolsPagination();
        return;
    }

    tools.forEach(tool => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <div class="tool-name">
                    ${escapeHTML(tool.name)}
                </div>

                <div class="tool-description">
                    ${escapeHTML(tool.description)}
                </div>
            </td>

            <td>
                <span class="category-badge">
                    ${escapeHTML(tool.category || "")}
                </span>
            </td>

            <td>
                <a
                    class="table-link"
                    href="${escapeAttribute(tool.link || "")}"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visit ↗
                </a>
            </td>

            <td>
                <div class="table-actions">

                    <button
                        type="button"
                        class="action-button"
                        onclick="editTool('${escapeAttribute(tool.id)}')"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="action-button delete"
                        onclick="deleteTool('${escapeAttribute(tool.id)}')"
                    >
                        Delete
                    </button>

                </div>
            </td>
        `;

        toolsTableBody.appendChild(row);
    });

    renderToolsPagination();
}

function renderToolsPagination() {
    const toolsPagination =
        document.getElementById("toolsPagination");

    if (!toolsPagination) {
        return;
    }

    const totalPages = Math.max(
        1,
        Math.ceil(
            toolsTotal / TOOLS_PER_PAGE
        )
    );

    const hasPreviousPage =
        toolsPage > 0;

    const hasNextPage =
        toolsPage < totalPages - 1;

    toolsPagination.innerHTML = `
        <button
            type="button"
            ${!hasPreviousPage ? "disabled" : ""}
            onclick="changeToolsPage(-1)"
        >
            Previous
        </button>

        <span>
            Page ${toolsPage + 1} of ${totalPages}
        </span>

        <button
            type="button"
            ${!hasNextPage ? "disabled" : ""}
            onclick="changeToolsPage(1)"
        >
            Next
        </button>
    `;
}
if (toolSearch) {
    toolSearch.addEventListener(
        "keydown",
        async event => {
            if (
                event.key !==
                "Enter"
            ) {
                return;
            }

            event.preventDefault();

            activeSearchQuery =
                toolSearch.value.trim();

            toolsPage = 0;

            await loadToolsFromSupabase();
        }
    );
}
async function changeToolsPage(direction) {
    const nextPage = toolsPage + direction;

    const totalPages = Math.max(
        1,
        Math.ceil(toolsTotal / TOOLS_PER_PAGE)
    );

    if (nextPage < 0 || nextPage >= totalPages) {
        return;
    }

    toolsPage = nextPage;

    await loadToolsFromSupabase();
}
async function editTool(id) {
    try {
        const {
            data: tool,
            error
        } = await supabaseClient
            .from("tools")
            .select(`
    id,
    name,
    description,
    link,
    category,
    subcategory
`)
            .eq("id", id)
            .single();

        if (error) {
            throw error;
        }

        if (!tool) {
            alert("Tool not found.");
            return;
        }

        const nameInput =
            document.getElementById("toolName");

        const descriptionInput =
            document.getElementById(
                "toolDescription"
            );

        const linkInput =
            document.getElementById("toolLink");

        const categoryInput =
            document.getElementById(
                "toolCategory"
            );

        if (
            !nameInput ||
            !descriptionInput ||
            !linkInput ||
            !categoryInput
        ) {
            return;
        }

        nameInput.value =
            tool.name || "";

        descriptionInput.value =
            tool.description || "";

        linkInput.value =
            tool.link || "";

        categoryInput.value =
            tool.category || "";

        renderToolSubcategorySelect();

        toolSubcategory.value =
            tool.subcategory || "";

        toolForm.dataset.editingId =
            tool.id;

        const submitButton =
            toolForm.querySelector(
                'button[type="submit"]'
            );

        if (submitButton) {
            submitButton.textContent =
                "Save Changes";
        }

        showToolForm();

    } catch (error) {
        console.error(
            "Edit tool loading error:",
            error
        );

        alert(
            "Failed to load tool.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );
    }
}

async function deleteTool(id) {

    try {

        const {
            data: tool,
            error: loadError
        } = await supabaseClient
            .from("tools")
            .select(
                "id,name"
            )
            .eq(
                "id",
                id
            )
            .single();


        if (loadError) {
            throw loadError;
        }


        if (!tool) {

            alert(
                "Tool not found."
            );

            return;
        }


        if (
            !confirm(
                `Delete "${tool.name}"?`
            )
        ) {
            return;
        }


        const {
            error
        } = await supabaseClient
            .from("tools")
            .delete()
            .eq(
                "id",
                id
            );


        if (error) {
            throw error;
        }


        delete affiliateLinks[id];

        delete affiliateToolData[id];


        sponsoredTools =
            sponsoredTools.filter(
                item =>
                    String(item) !==
                    String(id)
            );


        saveData();


        // RELOAD CURRENT TOOLS PAGE
        await loadToolsFromSupabase();


        // RELOAD GLOBAL STATS
        await loadToolStats();


        // RELOAD AFFILIATE DATA
        await loadAffiliateLinks();


        alert(
            "Tool deleted successfully."
        );


    } catch (error) {

        console.error(
            "Delete tool error:",
            error
        );


        alert(
            "Failed to delete tool.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );

    }

}

const sponsoredCampaignForm =
    document.getElementById(
        "sponsoredCampaignForm"
    );

const sponsoredToolSelect =
    document.getElementById(
        "sponsoredTool"
    );

const campaignType =
    document.getElementById(
        "campaignType"
    );

const campaignStartAt =
    document.getElementById(
        "campaignStartAt"
    );

const campaignEndAt =
    document.getElementById(
        "campaignEndAt"
    );

const campaignClickLimit =
    document.getElementById(
        "campaignClickLimit"
    );

const cancelSponsoredCampaignButton =
    document.getElementById(
        "cancelSponsoredCampaignButton"
    );

const sponsoredCampaignsBody =
    document.getElementById(
        "sponsoredCampaignsBody"
    );

const sponsoredCampaignsEmpty =
    document.getElementById(
        "sponsoredCampaignsEmpty"
    );

const activeSponsoredCampaigns =
    document.getElementById(
        "activeSponsoredCampaigns"
    );

const sponsoredImpressions =
    document.getElementById(
        "sponsoredImpressions"
    );

const sponsoredClicks =
    document.getElementById(
        "sponsoredClicks"
    );

const sponsoredCTR =
    document.getElementById(
        "sponsoredCTR"
    );

let sponsoredCampaigns = [];
let editingSponsoredCampaignId = null;

async function loadSponsoredCampaigns() {

    try {

        // LOAD CAMPAIGNS
        const {
            data: campaigns,
            error: campaignsError
        } = await supabaseClient
            .from("sponsored_campaigns")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );

        if (campaignsError) {
            throw campaignsError;
        }


        const campaignList =
            campaigns || [];


        // GET ALL TOOL IDS
        const toolIds =
            [
                ...new Set(
                    campaignList
                        .map(
                            campaign =>
                                campaign.tool_id
                        )
                        .filter(Boolean)
                )
            ];


        // LOAD TOOLS SEPARATELY
        let toolsMap = {};


        if (toolIds.length > 0) {

            const {
                data: toolData,
                error: toolsError
            } = await supabaseClient
                .from("tools")
                .select(
                    `
                    id,
                    name,
                    description,
                    link,
                    category
                    `
                )
                .in(
                    "id",
                    toolIds
                );


            if (toolsError) {
                throw toolsError;
            }


            (toolData || []).forEach(
                tool => {

                    toolsMap[
                        String(tool.id)
                    ] = tool;

                }
            );
        }


        // ATTACH TOOL DATA TO EACH CAMPAIGN
        sponsoredCampaigns =
            campaignList.map(
                campaign => ({

                    ...campaign,

                    tools:
                        toolsMap[
                            String(
                                campaign.tool_id
                            )
                        ] || null

                })
            );


        renderSponsoredCampaigns();

        renderSponsoredAnalytics();


    } catch (error) {

    console.error(
        "Sponsored campaigns loading error:",
        error
    );

    alert(
        "Sponsored campaigns loading error:\n\n" +
        (
            error?.message ||
            JSON.stringify(error)
        )
    );

    sponsoredCampaigns = [];

    renderSponsoredCampaigns();

    renderSponsoredAnalytics();
}
}
function renderSponsoredToolSelect() {

    const searchInput =
        document.getElementById(
            "sponsoredToolSearch"
        );

    const resultsContainer =
        document.getElementById(
            "sponsoredToolResults"
        );

    const selectedContainer =
        document.getElementById(
            "sponsoredToolSelected"
        );

    if (
        !searchInput ||
        !resultsContainer ||
        !selectedContainer ||
        !sponsoredToolSelect
    ) {
        return;
    }

    searchInput.oninput = async () => {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();

        resultsContainer.innerHTML = "";

        if (!search) {
            return;
        }

        const {
    data: matchedTools,
    error
} = await supabaseClient
    .from("tools")
    .select(
        "id,name,description,category,subcategory,link"
    )
    .or(
        `name.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%,subcategory.ilike.%${search}%,link.ilike.%${search}%`
    )
    .order(
        "created_at",
        {
            ascending: false
        }
    )
    .limit(20);

if (error) {
    console.error(
        "Sponsored tool search error:",
        error
    );

    resultsContainer.innerHTML = `
        <div class="sponsored-tool-no-results">
            Search failed.
        </div>
    `;

    return;
}

        if (!matchedTools.length) {

            resultsContainer.innerHTML = `
                <div class="sponsored-tool-no-results">
                    No tools found.
                </div>
            `;

            return;
        }

        matchedTools.forEach(tool => {

            const result =
                document.createElement(
                    "div"
                );

            result.className =
                "sponsored-tool-result";

            result.innerHTML = `
                <strong>
                    ${escapeHTML(
                        tool.name || ""
                    )}
                </strong>

                <small>
                    ${escapeHTML(
                        tool.category || ""
                    )}
                </small>
            `;

            result.addEventListener(
                "click",
                () => {

                    sponsoredToolSelect.value =
                        tool.id;

                    selectedContainer.innerHTML = `
                        Selected:
                        <strong>
                            ${escapeHTML(
                                tool.name || ""
                            )}
                        </strong>
                    `;

                    searchInput.value =
                        tool.name || "";

                    resultsContainer.innerHTML =
                        "";
                }
            );

            resultsContainer.appendChild(
                result
            );
        });
    };

    searchInput.value = "";
    resultsContainer.innerHTML = "";
    selectedContainer.innerHTML = "";
    sponsoredToolSelect.value = "";
}
if (sponsoredCampaignForm) {
    sponsoredCampaignForm.addEventListener(
        "submit",
        async event => {
            event.preventDefault();

            const toolId =
                sponsoredToolSelect?.value || "";

            const type =
                campaignType?.value || "";

            const startValue =
                campaignStartAt?.value || "";

            const endValue =
                campaignEndAt?.value || "";

            const clickValue =
                campaignClickLimit?.value || "";

            if (!toolId) {
                alert("Please select a tool.");
                return;
            }

            if (!type) {
                alert(
                    "Please select campaign type."
                );
                return;
            }

            if (
                type === "time" ||
                type === "time_click"
            ) {
                if (
                    !startValue ||
                    !endValue
                ) {
                    alert(
                        "Please set campaign start and end time."
                    );
                    return;
                }

                if (
                    new Date(startValue) >=
                    new Date(endValue)
                ) {
                    alert(
                        "End time must be after start time."
                    );
                    return;
                }
            }

            if (
                type === "click" ||
                type === "time_click"
            ) {
                if (
                    !clickValue ||
                    Number(clickValue) <= 0
                ) {
                    alert(
                        "Please enter a valid click limit."
                    );
                    return;
                }
            }

            try {

                const payload = {
                    tool_id: toolId,

                    campaign_type: type,

                    start_at:
                        (
                            type === "time" ||
                            type === "time_click"
                        )
                            ? new Date(
                                startValue
                            ).toISOString()
                            : null,

                    end_at:
                        (
                            type === "time" ||
                            type === "time_click"
                        )
                            ? new Date(
                                endValue
                            ).toISOString()
                            : null,

                    click_limit:
                        (
                            type === "click" ||
                            type === "time_click"
                        )
                            ? Number(
                                clickValue
                            )
                            : null,

                    updated_at:
                        new Date().toISOString()
                };

                let data;
                let error;

                if (
                    editingSponsoredCampaignId
                ) {

                    const {
    data: updatedCampaign,
    error: updateError
} = await supabaseClient.rpc(
    "update_sponsored_campaign",
    {
        p_campaign_id:
            editingSponsoredCampaignId,

        p_tool_id:
            toolId,

        p_campaign_type:
            type,

        p_start_at:
            (
                type === "time" ||
                type === "time_click"
            )
                ? new Date(
                    startValue
                ).toISOString()
                : null,

        p_end_at:
            (
                type === "time" ||
                type === "time_click"
            )
                ? new Date(
                    endValue
                ).toISOString()
                : null,

        p_click_limit:
            (
                type === "click" ||
                type === "time_click"
            )
                ? Number(clickValue)
                : null
    }
);

if (updateError) {
    throw updateError;
}

const {
    data: updatedTool,
    error: updatedToolError
} = await supabaseClient
    .from("tools")
    .select(`
        id,
        name,
        description,
        link,
        category
    `)
    .eq(
        "id",
        updatedCampaign.tool_id
    )
    .single();

if (updatedToolError) {
    throw updatedToolError;
}

data = {
    ...updatedCampaign,
    tools: updatedTool
};

error = null;

                } else {

    const {
        data: createdCampaign,
        error: rpcError
    } = await supabaseClient.rpc(
        "create_sponsored_campaign",
        {
            p_tool_id: toolId,
            p_campaign_type: type,
            p_start_at:
                (
                    type === "time" ||
                    type === "time_click"
                )
                    ? new Date(
                        startValue
                    ).toISOString()
                    : null,

            p_end_at:
                (
                    type === "time" ||
                    type === "time_click"
                )
                    ? new Date(
                        endValue
                    ).toISOString()
                    : null,

            p_click_limit:
                (
                    type === "click" ||
                    type === "time_click"
                )
                    ? Number(clickValue)
                    : null
        }
    );

    if (rpcError) {
        throw rpcError;
    }

const {
    data: toolData,
    error: toolError
} = await supabaseClient
    .from("tools")
    .select(`
        id,
        name,
        description,
        link,
        category
    `)
    .eq(
        "id",
        createdCampaign.tool_id
    )
    .single();

if (toolError) {
    throw toolError;
}

data = {
    ...createdCampaign,
    tools: toolData
};

error = null;
}

                if (error) {
                    throw error;
                }
                const wasEditing =
    Boolean(editingSponsoredCampaignId);
                if (
                    editingSponsoredCampaignId
                ) {

                    sponsoredCampaigns =
                        sponsoredCampaigns.map(
                            item =>
                                String(item.id) ===
                                String(
                                    editingSponsoredCampaignId
                                )
                                    ? data
                                    : item
                        );

                    editingSponsoredCampaignId =
                        null;

                } else {

                    if (data) {
                        sponsoredCampaigns.unshift(
                            data
                        );
                    }
                }

                sponsoredCampaignForm.reset();

                const submitButton =
                    sponsoredCampaignForm.querySelector(
                        'button[type="submit"]'
                    );

                if (submitButton) {
                    submitButton.textContent =
                        "Create Campaign";
                }

                renderSponsoredToolSelect();
                renderSponsoredCampaigns();
                renderSponsoredAnalytics();

                alert(
    wasEditing
        ? "Sponsored campaign updated successfully."
        : "Sponsored campaign created successfully."
);

            } catch (error) {

                console.error(
                    "Sponsored campaign save error:",
                    error
                );

                alert(
                    "Failed to save sponsored campaign.\n\n" +
                    (
                        error?.message ||
                        "Unknown error"
                    )
                );
            }
        }
    );
}
async function toggleSponsoredCampaignPause(
    campaignId
) {

    const campaign =
        sponsoredCampaigns.find(
            item =>
                String(item.id) ===
                String(campaignId)
        );

    if (!campaign) {
        return;
    }


    const shouldPause =
        campaign.is_active === true;


    const actionText =
        shouldPause
            ? "pause"
            : "resume";


    if (
        !confirm(
            `Are you sure you want to ${actionText} this campaign?`
        )
    ) {
        return;
    }


    try {

        const {
            data: updatedCampaign,
            error: toggleError
        } = await supabaseClient.rpc(
            "toggle_sponsored_campaign",
            {
                p_campaign_id:
                    campaignId,

                p_is_active:
                    !shouldPause
            }
        );


        if (toggleError) {
            throw toggleError;
        }


        const toolId =
            updatedCampaign.tool_id;


        const {
            data: toolData,
            error: toolError
        } = await supabaseClient
            .from("tools")
            .select(`
                id,
                name,
                description,
                link,
                category
            `)
            .eq(
                "id",
                toolId
            )
            .single();


        if (toolError) {
            throw toolError;
        }


        const completeCampaign = {
            ...updatedCampaign,
            tools: toolData
        };


        sponsoredCampaigns =
            sponsoredCampaigns.map(
                item =>
                    String(item.id) ===
                    String(campaignId)
                        ? completeCampaign
                        : item
            );


        renderSponsoredCampaigns();

        renderSponsoredAnalytics();


    } catch (error) {

        console.error(
            "Toggle sponsored campaign error:",
            error
        );


        alert(
            "Failed to update campaign status.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );

    }
}
function editSponsoredCampaign(campaignId) {
    const campaign = sponsoredCampaigns.find(
        item =>
            String(item.id) ===
            String(campaignId)
    );

    if (!campaign) {
        return;
    }

    const tool = campaign.tools || {};

    editingSponsoredCampaignId = campaign.id;

    const searchInput =
        document.getElementById(
            "sponsoredToolSearch"
        );

    const selectedContainer =
        document.getElementById(
            "sponsoredToolSelected"
        );

    if (searchInput) {
        searchInput.value =
            tool.name || "";
    }

    if (selectedContainer) {
        selectedContainer.innerHTML = `
            Selected:
            <strong>
                ${escapeHTML(
                    tool.name || ""
                )}
            </strong>
        `;
    }

    if (sponsoredToolSelect) {
        sponsoredToolSelect.value =
            campaign.tool_id || "";
    }

    if (campaignType) {
        campaignType.value =
            campaign.campaign_type || "";
    }

    if (campaignStartAt) {
        campaignStartAt.value =
            campaign.start_at
                ? new Date(
                    campaign.start_at
                )
                    .toISOString()
                    .slice(0, 16)
                : "";
    }

    if (campaignEndAt) {
        campaignEndAt.value =
            campaign.end_at
                ? new Date(
                    campaign.end_at
                )
                    .toISOString()
                    .slice(0, 16)
                : "";
    }

    if (campaignClickLimit) {
        campaignClickLimit.value =
            campaign.click_limit ??
            "";
    }

    const submitButton =
        sponsoredCampaignForm?.querySelector(
            'button[type="submit"]'
        );

    if (submitButton) {
        submitButton.textContent =
            "Save Changes";
    }

    const sponsoredSection =
        document.getElementById(
            "sponsored"
        );

    if (sponsoredSection) {
        sponsoredSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}
function isCampaignCurrentlyActive(
    campaign
) {
    if (!campaign.is_active) {
        return false;
    }

    const now =
        Date.now();

    if (
        campaign.start_at &&
        new Date(
            campaign.start_at
        ).getTime() > now
    ) {
        return false;
    }

    if (
        campaign.end_at &&
        new Date(
            campaign.end_at
        ).getTime() < now
    ) {
        return false;
    }

    if (
        campaign.click_limit !==
            null &&
        campaign.clicks >=
            campaign.click_limit
    ) {
        return false;
    }

    return true;
}

async function deleteSponsoredCampaign(
    campaignId
) {

    const campaign =
        sponsoredCampaigns.find(
            item =>
                String(item.id) ===
                String(campaignId)
        );

    if (!campaign) {
        return;
    }


    const tool =
        campaign.tools || {};


    if (
        !confirm(
            `Delete sponsored campaign for "${tool.name || "Unknown tool"}"?\n\n` +
            "This will permanently delete the campaign."
        )
    ) {
        return;
    }


    try {

        const {
            data: deleted,
            error: deleteError
        } = await supabaseClient.rpc(
            "delete_sponsored_campaign",
            {
                p_campaign_id:
                    campaignId
            }
        );


        if (deleteError) {
            throw deleteError;
        }


        sponsoredCampaigns =
            sponsoredCampaigns.filter(
                item =>
                    String(item.id) !==
                    String(campaignId)
            );


        renderSponsoredCampaigns();

        renderSponsoredAnalytics();


        alert(
            "Sponsored campaign deleted successfully."
        );


    } catch (error) {

        console.error(
            "Delete sponsored campaign error:",
            error
        );


        alert(
            "Failed to delete campaign.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );

    }
}
async function deactivateSponsoredCampaign(
    campaignId
) {

    if (
        !confirm(
            "Deactivate this sponsored campaign?"
        )
    ) {
        return;
    }

    try {

        const {
            data: pausedCampaign,
            error: pauseError
        } = await supabaseClient.rpc(
            "pause_sponsored_campaign",
            {
                p_campaign_id:
                    campaignId
            }
        );

        if (pauseError) {
            throw pauseError;
        }


        sponsoredCampaigns =
            sponsoredCampaigns.map(
                campaign =>

                    String(campaign.id) ===
                    String(campaignId)

                        ? {
                            ...campaign,
                            is_active:
                                false
                        }

                        : campaign
            );


        renderSponsoredCampaigns();

        renderSponsoredAnalytics();


    } catch (error) {

        console.error(
            "Deactivate campaign error:",
            error
        );

        alert(
            "Failed to deactivate campaign.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );

    }
}
function renderSponsoredAnalytics() {
    const active =
        sponsoredCampaigns.filter(
            isCampaignCurrentlyActive
        );

    const totalImpressions =
        sponsoredCampaigns.reduce(
            (
                total,
                campaign
            ) =>
                total +
                Number(
                    campaign.impressions ||
                    0
                ),
            0
        );

    const totalClicks =
        sponsoredCampaigns.reduce(
            (
                total,
                campaign
            ) =>
                total +
                Number(
                    campaign.clicks ||
                    0
                ),
            0
        );

    const ctr =
        totalImpressions > 0
            ? (
                totalClicks /
                totalImpressions
            ) * 100
            : 0;

    if (
        activeSponsoredCampaigns
    ) {
        activeSponsoredCampaigns.textContent =
            active.length;
    }

    if (
        sponsoredImpressions
    ) {
        sponsoredImpressions.textContent =
            totalImpressions;
    }

    if (
        sponsoredClicks
    ) {
        sponsoredClicks.textContent =
            totalClicks;
    }

    if (sponsoredCTR) {
        sponsoredCTR.textContent =
            `${ctr.toFixed(2)}%`;
    }
}

function renderSponsoredCampaigns() {
    if (!sponsoredCampaignsBody) {
        return;
    }

    sponsoredCampaignsBody.innerHTML =
        "";

    if (
        !sponsoredCampaigns.length
    ) {
        if (
            sponsoredCampaignsEmpty
        ) {
            sponsoredCampaignsEmpty.style.display =
                "block";
        }

        return;
    }

    if (
        sponsoredCampaignsEmpty
    ) {
        sponsoredCampaignsEmpty.style.display =
            "none";
    }

    sponsoredCampaigns.forEach(
        campaign => {

            const row =
                document.createElement(
                    "tr"
                );

            const tool =
                campaign.tools || {};

            const active =
                isCampaignCurrentlyActive(
                    campaign
                );

            const paused =
                campaign.is_active === false;

            let typeLabel =
                "Time";

            if (
                campaign.campaign_type ===
                "click"
            ) {
                typeLabel =
                    "Click";
            }

            if (
                campaign.campaign_type ===
                "time_click"
            ) {
                typeLabel =
                    "Time + Click";
            }

            const impressions =
                Number(
                    campaign.impressions ||
                    0
                );

            const clicks =
                Number(
                    campaign.clicks ||
                    0
                );

            const ctr =
                impressions > 0
                    ? (
                        clicks /
                        impressions
                    ) * 100
                    : 0;

            let statusLabel =
                "Active";

            if (paused) {
                statusLabel =
                    "Paused";
            } else if (!active) {
                statusLabel =
                    "Inactive";
            }

            row.innerHTML = `
                <td>
                    <div class="tool-name">
                        ${escapeHTML(
                            tool.name ||
                            "Unknown tool"
                        )}
                    </div>
                </td>

                <td>
                    ${escapeHTML(
                        typeLabel
                    )}
                </td>

                <td>
                    ${formatDate(
                        campaign.start_at
                    )}
                </td>

                <td>
                    ${formatDate(
                        campaign.end_at
                    )}
                </td>

                <td>
                    ${
                        campaign.click_limit !==
                        null
                            ? campaign.click_limit
                            : "—"
                    }
                </td>

                <td>
                    ${impressions}
                </td>

                <td>
                    ${clicks}
                </td>

                <td>
                    ${ctr.toFixed(2)}%
                </td>

                <td>
                    <span class="category-badge">
                        ${statusLabel}
                    </span>
                </td>

                <td>
                    <div class="table-actions">

                        <button
                            type="button"
                            class="action-button"
                            onclick="editSponsoredCampaign('${escapeAttribute(
                                campaign.id
                            )}')"
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            class="action-button"
                            onclick="toggleSponsoredCampaignPause('${escapeAttribute(
                                campaign.id
                            )}')"
                        >
                            ${
                                paused
                                    ? "Resume"
                                    : "Pause"
                            }
                        </button>

                        <button
                            type="button"
                            class="action-button delete"
                            onclick="deleteSponsoredCampaign('${escapeAttribute(
                                campaign.id
                            )}')"
                        >
                            Delete
                        </button>

                        <button
                            type="button"
                            class="action-button"
                            onclick="downloadSponsoredCampaignReport('${escapeAttribute(
                                campaign.id
                            )}')"
                        >
                            PDF Report
                        </button>

                    </div>
                </td>
            `;

            sponsoredCampaignsBody.appendChild(
                row
            );
        }
    );
}
renderSponsoredToolSelect();
loadSponsoredCampaigns();
function downloadSponsoredCampaignReport(
    campaignId
) {

    const campaign =
        sponsoredCampaigns.find(
            item =>
                String(item.id) ===
                String(campaignId)
        );

    if (!campaign) {
        alert(
            "Campaign not found."
        );

        return;
    }

    if (
        typeof window.jspdf ===
        "undefined"
    ) {
        alert(
            "PDF library is not loaded. Please refresh the page and try again."
        );

        return;
    }

    const {
        jsPDF
    } = window.jspdf;

    const doc =
        new jsPDF();

    const tool =
        campaign.tools || {};

    const impressions =
        Number(
            campaign.impressions || 0
        );

    const clicks =
        Number(
            campaign.clicks || 0
        );

    const ctr =
        impressions > 0
            ? (
                clicks /
                impressions
            ) * 100
            : 0;

    let campaignType =
        "Time";

    if (
        campaign.campaign_type ===
        "click"
    ) {
        campaignType =
            "Click";
    }

    if (
        campaign.campaign_type ===
        "time_click"
    ) {
        campaignType =
            "Time + Click";
    }

    const active =
        isCampaignCurrentlyActive(
            campaign
        );

    const paused =
        campaign.is_active === false;

    let status =
        "Active";

    if (paused) {
        status =
            "Paused";
    } else if (!active) {
        status =
            "Inactive";
    }

    const generatedDate =
        new Date()
            .toLocaleDateString(
                "en-US",
                {
                    year:
                        "numeric",
                    month:
                        "long",
                    day:
                        "numeric"
                }
            );

    const startDate =
        campaign.start_at
            ? formatDate(
                campaign.start_at
            )
            : "Not applicable";

    const endDate =
        campaign.end_at
            ? formatDate(
                campaign.end_at
            )
            : "Not applicable";

    const clickLimit =
        campaign.click_limit !==
        null
            ? String(
                campaign.click_limit
            )
            : "Not applicable";

    const fileSafeName =
        (
            tool.name ||
            "campaign"
        )
            .replace(
                /[^a-z0-9]+/gi,
                "-"
            )
            .replace(
                /^-+|-+$/g,
                ""
            )
            .toLowerCase();

    const pageWidth =
        doc.internal.pageSize
            .getWidth();

    const margin = 20;

    /*
        HEADER
    */

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(22);

    doc.text(
        "SOFTWEZ",
        margin,
        25
    );

    doc.setFontSize(11);

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.text(
        "Free Digital Resources",
        margin,
        32
    );

    doc.setDrawColor(
        200,
        200,
        200
    );

    doc.line(
        margin,
        38,
        pageWidth - margin,
        38
    );

    /*
        TITLE
    */

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(18);

    doc.text(
        "Sponsored Campaign Report",
        margin,
        52
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(10);

    doc.text(
        `Generated: ${generatedDate}`,
        margin,
        60
    );

    /*
        CAMPAIGN DETAILS
    */

    let y = 78;

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(12);

    doc.text(
        "Campaign Details",
        margin,
        y
    );

    y += 10;

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(10);

    const details = [
        [
            "Sponsored Tool",
            tool.name ||
                "Unknown tool"
        ],
        [
            "Campaign Type",
            campaignType
        ],
        [
            "Start Date",
            startDate
        ],
        [
            "End Date",
            endDate
        ],
        [
            "Click Limit",
            clickLimit
        ],
        [
            "Campaign Status",
            status
        ]
    ];

    details.forEach(
        ([label, value]) => {

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.text(
                `${label}:`,
                margin,
                y
            );

            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.text(
                String(value),
                margin + 42,
                y
            );

            y += 8;
        }
    );

    /*
        PERFORMANCE
    */

    y += 8;

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(12);

    doc.text(
        "Campaign Performance",
        margin,
        y
    );

    y += 12;

    const metrics = [
        [
            "Total Impressions",
            impressions.toLocaleString()
        ],
        [
            "Total Clicks",
            clicks.toLocaleString()
        ],
        [
            "Campaign CTR",
            `${ctr.toFixed(2)}%`
        ]
    ];

    metrics.forEach(
        ([label, value]) => {

            doc.setFont(
                "helvetica",
                "bold"
            );

            doc.text(
                label,
                margin,
                y
            );

            doc.setFont(
                "helvetica",
                "normal"
            );

            doc.text(
                value,
                pageWidth - margin - 35,
                y,
                {
                    align:
                        "right"
                }
            );

            y += 10;
        }
    );

    /*
        SUMMARY
    */

    y += 10;

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(12);

    doc.text(
        "Performance Summary",
        margin,
        y
    );

    y += 9;

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(10);

    const summary =
        `This campaign generated ${impressions.toLocaleString()} recorded impressions and ${clicks.toLocaleString()} recorded clicks, resulting in a click-through rate of ${ctr.toFixed(2)}%.`;

    const summaryLines =
        doc.splitTextToSize(
            summary,
            pageWidth -
                margin * 2
        );

    doc.text(
        summaryLines,
        margin,
        y
    );

    y +=
        summaryLines.length * 6 +
        12;

    /*
        REPORT NOTE
    */

    doc.setFontSize(9);

    doc.setTextColor(
        100,
        100,
        100
    );

    const note =
        "Performance figures in this report are based on recorded Softwez platform campaign analytics.";

    const noteLines =
        doc.splitTextToSize(
            note,
            pageWidth -
                margin * 2
        );

    doc.text(
        noteLines,
        margin,
        y
    );

    /*
        FOOTER
    */

    const pageHeight =
        doc.internal.pageSize
            .getHeight();

    doc.setTextColor(
        120,
        120,
        120
    );

    doc.setFontSize(8);

    doc.text(
        "Softwez — Sponsored Campaign Report",
        margin,
        pageHeight - 15
    );

    doc.text(
        "softwez.com",
        pageWidth - margin,
        pageHeight - 15,
        {
            align:
                "right"
        }
    );

    /*
        DOWNLOAD
    */

    doc.save(
        `softwez-campaign-report-${fileSafeName || "campaign"}.pdf`
    );
}
async function loadPendingSubmissions() {
    if (!pendingSubmissionsBody) {
        return;
    }

    try {
        const {
            data,
            error
        } =
            await supabaseClient
                .from(
                    "tool_submissions"
                )
                .select("*")
                .eq(
                    "status",
                    "pending"
                )
                .order(
                    "submitted_at",
                    {
                        ascending:
                            false
                    }
                );

        if (error) {
            throw error;
        }

        pendingSubmissions =
            data || [];

        renderPendingSubmissions();
        updatePendingCounts();

    } catch (error) {
        console.error(
            "Pending submissions loading error:",
            error
        );

        pendingSubmissions = [];

        updatePendingCounts();

        pendingSubmissionsBody.innerHTML = `
            <tr>
                <td colspan="5">
                    <div class="empty-state">
                        Failed to load submissions.
                    </div>
                </td>
            </tr>
        `;

        if (
            pendingSubmissionsEmpty
        ) {
            pendingSubmissionsEmpty.style.display =
                "none";
        }
    }
}

function renderPendingSubmissions() {
    if (!pendingSubmissionsBody) {
        return;
    }

    pendingSubmissionsBody.innerHTML =
        "";

    if (
        !pendingSubmissions.length
    ) {
        if (
            pendingSubmissionsEmpty
        ) {
            pendingSubmissionsEmpty.style.display =
                "block";
        }

        return;
    }

    if (
        pendingSubmissionsEmpty
    ) {
        pendingSubmissionsEmpty.style.display =
            "none";
    }

    pendingSubmissions.forEach(
        submission => {
            const row =
                document.createElement(
                    "tr"
                );

            const name =
                submission.name ||
                "Untitled";

            const description =
                submission.description ||
                "";

            const category =
                submission.category ||
                "Uncategorized";

            const url =
                submission.url ||
                "";

            row.innerHTML = `
                <td>
                    <div class="tool-name">
                        ${escapeHTML(
                            name
                        )}
                    </div>

                    ${
                        url
                            ? `
                                <a
                                    class="table-link"
                                    href="${escapeAttribute(
                                        url
                                    )}"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit ↗
                                </a>
                            `
                            : ""
                    }
                </td>

                <td>
                    <div class="tool-description">
                        ${escapeHTML(
                            description
                        )}
                    </div>
                </td>

                <td>
                    <span class="category-badge">
                        ${escapeHTML(
                            category
                        )}
                    </span>
                </td>

                <td>
                    ${formatDate(
                        submission.submitted_at
                    )}
                </td>

                <td>
                    <div class="table-actions">
                         <button
    type="button"
    class="action-button"
    onclick="editPendingSubmission('${escapeAttribute(
        submission.id
    )}')"
>
    Edit
</button>
                        <button
                            type="button"
                            class="action-button"
                            onclick="approveSubmission('${escapeAttribute(
                                submission.id
                            )}')"
                        >
                        
                            Approve
                        </button>

                        <button
                            type="button"
                            class="action-button delete"
                            onclick="rejectSubmission('${escapeAttribute(
                                submission.id
                            )}')"
                        >
                            Reject
                        </button>

                    </div>
                </td>
            `;

            pendingSubmissionsBody.appendChild(
                row
            );
        }
    );
}
function editPendingSubmission(
    submissionId
) {

    const submission =
        pendingSubmissions.find(
            item =>
                String(item.id) ===
                String(submissionId)
        );

    if (!submission) {

        alert(
            "Submission not found."
        );

        return;
    }

    const nameInput =
        document.getElementById(
            "toolName"
        );

    const descriptionInput =
        document.getElementById(
            "toolDescription"
        );

    const linkInput =
        document.getElementById(
            "toolLink"
        );

    const categoryInput =
        document.getElementById(
            "toolCategory"
        );

    if (
        !nameInput ||
        !descriptionInput ||
        !linkInput ||
        !categoryInput ||
        !toolSubcategory
    ) {

        alert(
            "Tool edit form is not available."
        );

        return;
    }

    nameInput.value =
        submission.name || "";

    descriptionInput.value =
        submission.description || "";

    linkInput.value =
        submission.url || "";

    categoryInput.value =
        submission.category || "";

    renderToolSubcategorySelect();

    toolSubcategory.value =
        submission.subcategory || "";

    toolForm.dataset.pendingEditingId =
        submission.id;

    const submitButton =
        toolForm.querySelector(
            'button[type="submit"]'
        );

    if (submitButton) {

        submitButton.textContent =
            "Save Changes";
    }

    openSection("tools");
    showToolForm();
}
async function approveSubmission(
    submissionId
) {
    const submission =
        pendingSubmissions.find(
            item =>
                String(item.id) ===
                String(submissionId)
        );

    if (!submission) {
        alert(
            "Submission not found."
        );

        return;
    }

    const name =
        (
            submission.name ||
            ""
        ).trim();

    const description =
        (
            submission.description ||
            ""
        ).trim();

    const url =
        (
            submission.url ||
            ""
        ).trim();

    const category =
        (
            submission.category ||
            ""
        ).trim();
    
    const subcategory =
    (
        submission.subcategory ||
        ""
    ).trim();

    if (
        !name ||
        !description ||
        !url ||
        !category ||
        !subcategory
    ) {
        alert(
            "This submission is missing required information."
        );

        return;
    }

    if (
        !confirm(
            `Approve "${name}" and publish it to Softwez?`
        )
    ) {
        return;
    }

    try {
        const {
            data: existingTools,
            error: existingError
        } =
            await supabaseClient
                .from("tools")
                .select(
                    "id,name,link"
                )
                .eq(
                    "link",
                    url
                );

        if (existingError) {
            throw existingError;
        }

        if (
            existingTools &&
            existingTools.length > 0
        ) {
            const {
                data: statusUpdated,
                error: statusError
            } =
                await supabaseClient.rpc(
                    "update_submission_status",
                    {
                        p_submission_id:
                            submissionId,

                        p_status:
                            "approved"
                    }
                );

            if (statusError) {
                throw statusError;
            }

            if (!statusUpdated) {
                throw new Error(
                    "Submission was not updated."
                );
            }

            await loadPendingSubmissions();

            alert(
                "This tool already exists. The submission has been approved without creating a duplicate."
            );

            return;
        }

        const {
            data: createdTool,
            error: insertError
        } =
            await supabaseClient
                .from("tools")
                .insert([
                    {
                        name,
                        description,
                        link: url,
                        category,
                        subcategory,
                        is_sponsored:
                            false
                    }
                ])
                .select()
                .single();

        if (insertError) {
            throw insertError;
        }

        if (!createdTool) {
            throw new Error(
                "Tool was not created."
            );
        }

        const {
            data: statusUpdated,
            error: statusError
        } =
            await supabaseClient.rpc(
                "update_submission_status",
                {
                    p_submission_id:
                        submissionId,

                    p_status:
                        "approved"
                }
            );

        if (statusError) {
            throw statusError;
        }

        if (!statusUpdated) {
            throw new Error(
                "Submission was not updated."
            );
        }

        await loadToolsFromSupabase();
        await loadPendingSubmissions();

        alert(
            "Submission approved and tool added successfully."
        );

    } catch (error) {
        console.error(
            "Approve submission error:",
            error
        );

        alert(
            "Failed to approve submission.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );
    }
}

async function rejectSubmission(
    submissionId
) {
    const submission =
        pendingSubmissions.find(
            item =>
                String(item.id) ===
                String(submissionId)
        );

    if (!submission) {
        alert(
            "Submission not found."
        );

        return;
    }

    const name =
        submission.name ||
        "this submission";

    if (
        !confirm(
            `Reject "${name}"?`
        )
    ) {
        return;
    }

    try {
        const {
            data: statusUpdated,
            error: statusError
        } =
            await supabaseClient.rpc(
                "update_submission_status",
                {
                    p_submission_id:
                        submissionId,

                    p_status:
                        "rejected"
                }
            );

        if (statusError) {
            throw statusError;
        }

        if (!statusUpdated) {
            throw new Error(
                "Submission was not updated."
            );
        }

        await loadPendingSubmissions();

        alert(
            "Submission rejected successfully."
        );

    } catch (error) {
        console.error(
            "Reject submission error:",
            error
        );

        alert(
            "Failed to reject submission.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );
    }
}

function updatePendingCounts() {
    const count =
        pendingSubmissions.length;

    if (pendingSubmissionsCount) {
        pendingSubmissionsCount.textContent =
            count;
    }

    if (pendingNavCount) {
        pendingNavCount.textContent =
            count;
    }

    if (pendingSubmissionCount) {
        pendingSubmissionCount.textContent =
            `${count} pending`;
    }
}

async function loadCategories() {
    try {
        const {
            data,
            error
        } =
            await supabaseClient
                .from("categories")
                .select("*")
                .order(
    "sort_order",
    {
        ascending:
            true
    }
);

        if (error) {
            throw error;
        }

        categories =
            Array.isArray(data)
                ? data
                : [];

        await loadSubcategories();

        renderCategorySelect();
        renderSubcategoryCategorySelect();
        renderCategories();

    } catch (error) {
        console.error(
            "Load categories error:",
            error
        );

        categories = [];
        subcategories = [];

        renderCategorySelect();
        renderSubcategoryCategorySelect();
        renderCategories();
    }
}

async function loadSubcategories() {
    try {
        const {
            data,
            error
        } =
            await supabaseClient
                .from("subcategories")
                .select("*")
                .order(
                    "name",
                    {
                        ascending:
                            true
                    }
                );

        if (error) {
            throw error;
        }

        subcategories =
            Array.isArray(data)
                ? data
                : [];

    } catch (error) {
        console.error(
            "Load subcategories error:",
            error
        );

        subcategories = [];
    }
}

if (categoryForm) {
    categoryForm.addEventListener(
        "submit",
        async event => {
            event.preventDefault();

            const name =
                categoryName?.value.trim() ||
                "";

            if (!name) {
                alert(
                    "Please enter a category name."
                );

                return;
            }

            if (
                categories.some(
                    category =>
                        String(
                            category.name
                        ).toLowerCase() ===
                        name.toLowerCase()
                )
            ) {
                alert(
                    "This category already exists."
                );

                return;
            }

            try {
                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .from("categories")
                        .insert([
                            {
                                name
                            }
                        ])
                        .select()
                        .single();

                if (error) {
                    throw error;
                }

                if (data) {
                    categories.push(
                        data
                    );
                }

                categoryForm.reset();

                renderCategorySelect();
                renderSubcategoryCategorySelect();
                renderCategories();
                renderStats();

                alert(
                    "Category added successfully."
                );

            } catch (error) {
                console.error(
                    "Add category error:",
                    error
                );

                alert(
                    "Failed to add category.\n\n" +
                    (
                        error?.message ||
                        "Unknown error"
                    )
                );
            }
        }
    );
}

if (subcategoryForm) {
    subcategoryForm.addEventListener(
        "submit",
        async event => {
            event.preventDefault();

            const categoryId =
                subcategoryCategory?.value ||
                "";

            const name =
                subcategoryName?.value.trim() ||
                "";

            if (
                !categoryId ||
                !name
            ) {
                alert(
                    "Please select a category and enter a subcategory name."
                );

                return;
            }

            if (
                subcategories.some(
                    item =>
                        String(
                            item.category_id
                        ) ===
                            String(
                                categoryId
                            ) &&
                        String(
                            item.name
                        ).toLowerCase() ===
                            name.toLowerCase()
                )
            ) {
                alert(
                    "This subcategory already exists under this category."
                );

                return;
            }

            try {
                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .from(
                            "subcategories"
                        )
                        .insert([
                            {
                                category_id:
                                    categoryId,
                                name
                            }
                        ])
                        .select()
                        .single();

                if (error) {
                    throw error;
                }

                if (data) {
                    subcategories.push(
                        data
                    );
                }

                subcategoryForm.reset();

                renderCategories();

                alert(
                    "Subcategory added successfully."
                );

            } catch (error) {
                console.error(
                    "Add subcategory error:",
                    error
                );

                alert(
                    "Failed to add subcategory.\n\n" +
                    (
                        error?.message ||
                        "Unknown error"
                    )
                );
            }
        }
    );
}

function renderCategories() {

    if (!categoryAdminList) {
        return;
    }

    categoryAdminList.innerHTML = "";

    if (!categories.length) {

        categoryAdminList.innerHTML = `
            <div class="empty-state">
                No categories found.
            </div>
        `;

        return;
    }

    categories.forEach(
        (category, index) => {

            const children =
                subcategories.filter(
                    item =>
                        String(
                            item.category_id
                        ) ===
                        String(
                            category.id
                        )
                );

            const wrapper =
                document.createElement(
                    "div"
                );

            wrapper.className =
                "category-admin-item";

            wrapper.draggable = true;

            wrapper.dataset.categoryId =
                category.id;

            const subcategoryHTML =
                children.length
                    ? children
                        .map(
                            item =>
                                `
                <div class="subcategory-admin-item">

                    <span>
                        ${escapeHTML(
                            item.name
                        )}
                    </span>

                    <button
                        type="button"
                        class="action-button delete"
                        onclick="deleteSubcategory('${escapeAttribute(
                            item.id
                        )}')"
                    >
                        Delete
                    </button>

                </div>
                                `
                        )
                        .join("")
                    : `
                <div class="subcategory-empty">
                    No subcategories
                </div>
                    `;

            wrapper.innerHTML = `
                <div class="category-admin-header">

                    <div class="category-admin-main">

                        <span
                            class="category-drag-handle"
                            title="Drag to reorder"
                            aria-hidden="true"
                        >
                            ⋮⋮
                        </span>

                        <div>

                            <strong>
                                ${escapeHTML(
                                    category.name
                                )}
                            </strong>

                            <small>
                                ${children.length}
                                ${
                                    children.length ===
                                    1
                                        ? "subcategory"
                                        : "subcategories"
                                }
                            </small>

                        </div>

                    </div>

                    <button
                        type="button"
                        class="action-button delete"
                        onclick="deleteCategory('${escapeAttribute(
                            category.id
                        )}')"
                    >
                        Delete Category
                    </button>

                </div>

                <div class="subcategory-admin-list">
                    ${subcategoryHTML}
                </div>
            `;

            /* =====================================================
               DRAG START
            ===================================================== */

            wrapper.addEventListener(
                "dragstart",
                event => {

                    wrapper.classList.add(
                        "category-dragging"
                    );

                    event.dataTransfer.effectAllowed =
                        "move";

                    event.dataTransfer.setData(
                        "text/plain",
                        String(category.id)
                    );
                }
            );


            /* =====================================================
               DRAG END
            ===================================================== */

            wrapper.addEventListener(
                "dragend",
                () => {

                    wrapper.classList.remove(
                        "category-dragging"
                    );

                    document
                        .querySelectorAll(
                            ".category-drag-over"
                        )
                        .forEach(
                            element => {
                                element.classList.remove(
                                    "category-drag-over"
                                );
                            }
                        );
                }
            );


            /* =====================================================
               DRAG OVER
            ===================================================== */

            wrapper.addEventListener(
                "dragover",
                event => {

                    event.preventDefault();

                    event.dataTransfer.dropEffect =
                        "move";

                    if (
                        wrapper.classList.contains(
                            "category-dragging"
                        )
                    ) {
                        return;
                    }

                    document
                        .querySelectorAll(
                            ".category-drag-over"
                        )
                        .forEach(
                            element => {
                                if (
                                    element !==
                                    wrapper
                                ) {
                                    element.classList.remove(
                                        "category-drag-over"
                                    );
                                }
                            }
                        );

                    wrapper.classList.add(
                        "category-drag-over"
                    );
                }
            );


            /* =====================================================
               DRAG LEAVE
            ===================================================== */

            wrapper.addEventListener(
                "dragleave",
                event => {

                    if (
                        !wrapper.contains(
                            event.relatedTarget
                        )
                    ) {
                        wrapper.classList.remove(
                            "category-drag-over"
                        );
                    }
                }
            );


            /* =====================================================
               DROP
            ===================================================== */

            wrapper.addEventListener(
                "drop",
                async event => {

                    event.preventDefault();

                    wrapper.classList.remove(
                        "category-drag-over"
                    );

                    const draggedId =
                        event.dataTransfer.getData(
                            "text/plain"
                        );

                    const targetId =
                        String(
                            category.id
                        );

                    if (
                        !draggedId ||
                        draggedId === targetId
                    ) {
                        return;
                    }

                    const draggedIndex =
                        categories.findIndex(
                            item =>
                                String(
                                    item.id
                                ) ===
                                String(
                                    draggedId
                                )
                        );

                    const targetIndex =
                        categories.findIndex(
                            item =>
                                String(
                                    item.id
                                ) ===
                                targetId
                        );

                    if (
                        draggedIndex === -1 ||
                        targetIndex === -1
                    ) {
                        return;
                    }

                    const [
                        draggedCategory
                    ] =
                        categories.splice(
                            draggedIndex,
                            1
                        );

                    let newTargetIndex =
                        targetIndex;

                    if (
                        draggedIndex <
                        targetIndex
                    ) {
                        newTargetIndex--;
                    }

                    categories.splice(
                        newTargetIndex,
                        0,
                        draggedCategory
                    );

                    /* Re-render immediately */

                    renderCategories();

                    /* Save new order */

                    await saveCategoryOrder();
                }
            );

            categoryAdminList.appendChild(
                wrapper
            );
        }
    );
}


/* =========================================================
   SAVE CATEGORY ORDER
========================================================= */

async function saveCategoryOrder() {

    try {

        const updates =
            categories.map(
                (
                    category,
                    index
                ) => {

                    return supabaseClient
                        .from(
                            "categories"
                        )
                        .update({
                            sort_order:
                                index + 1
                        })
                        .eq(
                            "id",
                            category.id
                        );
                }
            );

        const results =
            await Promise.all(
                updates
            );

        const failed =
            results.find(
                result =>
                    result.error
            );

        if (failed) {
            throw failed.error;
        }

    } catch (error) {

        console.error(
            "Save category order error:",
            error
        );

        alert(
            "Failed to save category order.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );

        /* Reload original database order */

        await loadCategories();
    }
}

async function deleteSubcategory(id) {
    const item =
        subcategories.find(
            row =>
                String(row.id) ===
                String(id)
        );

    if (!item) {
        return;
    }

    if (
        !confirm(
            `Delete "${item.name}"?`
        )
    ) {
        return;
    }

    try {
        const {
            error
        } =
            await supabaseClient
                .from("subcategories")
                .delete()
                .eq(
                    "id",
                    id
                );

        if (error) {
            throw error;
        }

        subcategories =
            subcategories.filter(
                row =>
                    String(row.id) !==
                    String(id)
            );

        renderCategories();

        alert(
            "Subcategory deleted successfully."
        );

    } catch (error) {
        console.error(
            "Delete subcategory error:",
            error
        );

        alert(
            "Failed to delete subcategory.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );
    }
}

async function deleteCategory(id) {

    const category =
        categories.find(
            row =>
                String(row.id) ===
                String(id)
        );


    if (!category) {
        return;
    }


    try {

        // CHECK ALL TOOLS IN DATABASE
        const {
            count,
            error: checkError
        } = await supabaseClient
            .from("tools")
            .select(
                "id",
                {
                    count: "exact",
                    head: true
                }
            )
            .ilike(
                "category",
                category.name
            );


        if (checkError) {
            throw checkError;
        }


        if (count > 0) {

            alert(
                "This category is currently used by one or more tools. Remove or move those tools first."
            );

            return;
        }


        if (
            !confirm(
                `Delete category "${category.name}"?\n\nAll subcategories under this category will also be deleted.`
            )
        ) {
            return;
        }


        const {
            error
        } =
            await supabaseClient
                .from("categories")
                .delete()
                .eq(
                    "id",
                    id
                );


        if (error) {
            throw error;
        }


        categories =
            categories.filter(
                row =>
                    String(row.id) !==
                    String(id)
            );


        subcategories =
            subcategories.filter(
                row =>
                    String(
                        row.category_id
                    ) !==
                    String(id)
            );


        renderCategorySelect();

        renderSubcategoryCategorySelect();

        renderCategories();

        renderStats();


        alert(
            "Category deleted successfully."
        );


    } catch (error) {

        console.error(
            "Delete category error:",
            error
        );


        alert(
            "Failed to delete category.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );

    }

}
/* =========================================================
   AFFILIATE MANAGEMENT
========================================================= */

function renderAffiliateToolSelect() {

    const searchInput =
        document.getElementById(
            "affiliateToolSearch"
        );

    const resultsContainer =
        document.getElementById(
            "affiliateToolResults"
        );

    const selectedContainer =
        document.getElementById(
            "affiliateToolSelected"
        );


    if (
        !searchInput ||
        !resultsContainer ||
        !selectedContainer ||
        !affiliateTool
    ) {
        return;
    }


    searchInput.oninput = async () => {

        const search =
            searchInput.value
                .trim()
                .replace(/[%,()]/g, " ")
                .replace(/\*/g, " ")
                .replace(/\s+/g, " ")
                .trim();


        if (!search) {

            resultsContainer.innerHTML =
                "";

            return;
        }


        try {

            const {
                data: matchedTools,
                error
            } = await supabaseClient
                .from("tools")
                .select(
                    `
                    id,
                    name,
                    description,
                    category,
                    subcategory,
                    link
                    `
                )
                .or(
                    `name.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%,subcategory.ilike.%${search}%,link.ilike.%${search}%`
                )
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                )
                .limit(20);


            if (error) {
                throw error;
            }


            resultsContainer.innerHTML =
                "";


            if (
                !matchedTools ||
                matchedTools.length === 0
            ) {

                resultsContainer.innerHTML = `
                    <div class="affiliate-tool-no-results">
                        No tools found.
                    </div>
                `;

                return;
            }


            matchedTools.forEach(
                tool => {

                    const result =
                        document.createElement(
                            "div"
                        );


                    result.className =
                        "affiliate-tool-result";


                    result.innerHTML = `
                        <strong>
                            ${escapeHTML(
                                tool.name || ""
                            )}
                        </strong>

                        <small>
                            ${escapeHTML(
                                tool.category || ""
                            )}
                        </small>
                    `;


                    result.addEventListener(
                        "click",
                        () => {

                            affiliateTool.value =
                                tool.id;


                            selectedContainer.innerHTML = `
                                Selected:
                                <strong>
                                    ${escapeHTML(
                                        tool.name || ""
                                    )}
                                </strong>
                            `;


                            searchInput.value =
                                tool.name || "";


                            resultsContainer.innerHTML =
                                "";

                        }
                    );


                    resultsContainer.appendChild(
                        result
                    );

                }
            );

        } catch (error) {

            console.error(
                "Affiliate tool search error:",
                error
            );

            resultsContainer.innerHTML = `
                <div class="affiliate-tool-no-results">
                    Search failed.
                </div>
            `;

        }

    };


    searchInput.value =
        "";

    resultsContainer.innerHTML =
        "";

    selectedContainer.innerHTML =
        "";

    affiliateTool.value =
        "";

}


/* =========================================================
   SAVE AFFILIATE
========================================================= */

if (affiliateForm) {

    affiliateForm.onsubmit = async event => {

        event.preventDefault();


        const toolId =
            affiliateTool
                ? affiliateTool.value
                : "";


        const input =
            document.getElementById(
                "affiliateLink"
            );


        const link =
            input
                ? input.value.trim()
                : "";


        if (
            !toolId ||
            !link
        ) {

            alert(
                "Please select a tool and enter an affiliate link."
            );

            return;
        }


        try {

            const {
                data: savedAffiliate,
                error: affiliateError
            } = await supabaseClient.rpc(
                "save_affiliate_link",
                {
                    p_tool_id:
                        toolId,

                    p_affiliate_url:
                        link
                }
            );


            if (affiliateError) {
                throw affiliateError;
            }


            /* UPDATE LOCAL STATE */

            affiliateLinks[toolId] =
                link;


            /*
                Get tool information directly.
                This works even when the tool
                is outside the current 50-tool page.
            */

            const {
                data: toolData,
                error: toolError
            } = await supabaseClient
                .from("tools")
                .select(
                    `
                    id,
                    name,
                    description,
                    category,
                    subcategory,
                    link
                    `
                )
                .eq(
                    "id",
                    toolId
                )
                .single();


            if (toolError) {
                throw toolError;
            }


            affiliateToolData[toolId] =
                toolData;


            /* CLEAR OLD LOCAL STORAGE DATA */

            localStorage.removeItem(
                "softwez_affiliate"
            );


            /* RESET FORM */

            if (affiliateForm) {
                affiliateForm.reset();
            }


            if (affiliateTool) {
                affiliateTool.value =
                    "";
            }


            const searchInput =
                document.getElementById(
                    "affiliateToolSearch"
                );

            const resultsContainer =
                document.getElementById(
                    "affiliateToolResults"
                );

            const selectedContainer =
                document.getElementById(
                    "affiliateToolSelected"
                );


            if (searchInput) {
                searchInput.value =
                    "";
            }

            if (resultsContainer) {
                resultsContainer.innerHTML =
                    "";
            }

            if (selectedContainer) {
                selectedContainer.innerHTML =
                    "";
            }


            renderAffiliateList();

            renderStats();


            alert(
                "Affiliate link saved successfully."
            );


        } catch (error) {

            console.error(
                "Affiliate save error:",
                error
            );


            alert(
                "Affiliate link could not be saved.\n\n" +
                (
                    error?.message ||
                    "Unknown error"
                )
            );

        }

    };

}


/* =========================================================
   AFFILIATE LIST
========================================================= */

function renderAffiliateList() {

    if (!affiliateList) {
        return;
    }


    affiliateList.innerHTML =
        "";


    const entries =
        Object.entries(
            affiliateLinks
        );


    if (!entries.length) {

        affiliateList.innerHTML = `
            <div class="empty-state">
                No affiliate tools yet.
            </div>
        `;

        return;
    }


    const list =
        document.createElement(
            "div"
        );


    list.className =
        "admin-list";


    entries.forEach(
        ([toolId, link]) => {

            const tool =
                affiliateToolData[
                    toolId
                ];


            if (!tool) {
                return;
            }


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "admin-list-item";


            item.innerHTML = `
                <div class="admin-list-main">

                    <div class="admin-list-title">
                        ${escapeHTML(
                            tool.name || ""
                        )}
                    </div>

                    <div class="admin-list-meta">
                        ${escapeHTML(
                            link || ""
                        )}
                    </div>

                </div>

                <div class="admin-list-actions">

                    <button
                        type="button"
                        class="action-button delete"
                        onclick="removeAffiliate('${escapeAttribute(
                            toolId
                        )}')"
                    >
                        Remove
                    </button>

                </div>
            `;


            list.appendChild(
                item
            );

        }
    );


    affiliateList.appendChild(
        list
    );

}


/* =========================================================
   DELETE AFFILIATE
========================================================= */

async function removeAffiliate(
    toolId
) {

    if (!toolId) {
        return;
    }


    const tool =
        affiliateToolData[
            toolId
        ];


    const toolName =
        tool?.name ||
        "this tool";


    if (
        !confirm(
            `Remove affiliate link for "${toolName}"?`
        )
    ) {
        return;
    }


    try {

        const {
            data: deleted,
            error: deleteError
        } = await supabaseClient.rpc(
            "delete_affiliate_link",
            {
                p_tool_id:
                    toolId
            }
        );


        if (deleteError) {
            throw deleteError;
        }


        /* REMOVE FROM MEMORY */

        delete affiliateLinks[
            toolId
        ];


        delete affiliateToolData[
            toolId
        ];


        /*
            Affiliate data is now stored
            in Supabase only.
        */

        localStorage.removeItem(
            "softwez_affiliate"
        );


        renderAffiliateList();

        renderStats();


        alert(
            "Affiliate link removed successfully."
        );


    } catch (error) {

        console.error(
            "Affiliate removal error:",
            error
        );


        alert(
            "Affiliate link could not be removed.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );

    }

}

/* =========================================================
   AD NETWORK MANAGEMENT
========================================================= */


/* =========================================================
   SAVE AD NETWORK
========================================================= */

if (adNetworkForm) {

    adNetworkForm.onsubmit = async event => {

        event.preventDefault();


        const nameInput =
            document.getElementById(
                "adNetworkName"
            );


        const codeInput =
            document.getElementById(
                "adNetworkCode"
            );


        const name =
            nameInput
                ? nameInput.value.trim()
                : "";


        const code =
            codeInput
                ? codeInput.value.trim()
                : "";


        if (!name || !code) {

            alert(
                "Please fill in both fields."
            );

            return;
        }


        try {

            const {
                data,
                error
            } = await supabaseClient.rpc(
                "save_ad_network",
                {
                    p_name:
                        name,

                    p_code:
                        code
                }
            );


            if (error) {
                throw error;
            }


            /* =========================================
               UPDATE LOCAL MEMORY
            ========================================= */

            if (data) {

                const savedNetwork =
                    typeof data === "string"
                        ? JSON.parse(data)
                        : data;


                /*
                    Remove an older local copy
                    if the same ID already exists.
                */

                adNetworks =
                    adNetworks.filter(
                        network =>
                            String(network.id) !==
                            String(
                                savedNetwork.id
                            )
                    );


                adNetworks.push(
                    savedNetwork
                );

            }


            /* =========================================
               REMOVE OLD LOCAL STORAGE DATA
            ========================================= */

            localStorage.removeItem(
                "softwez_ad_networks"
            );


            /* =========================================
               RESET FORM
            ========================================= */

            adNetworkForm.reset();


            /* =========================================
               REFRESH LIST FROM DATABASE
            ========================================= */

            await loadAdNetworks();


            alert(
                "Ad network saved successfully."
            );


        } catch (error) {

            console.error(
                "Ad network save error:",
                error
            );


            alert(
                "Ad network could not be saved.\n\n" +
                (
                    error?.message ||
                    "Unknown error"
                )
            );

        }

    };

}


/* =========================================================
   RENDER AD NETWORKS
========================================================= */

function renderAdNetworks() {

    if (!adNetworkList) {
        return;
    }


    adNetworkList.innerHTML =
        "";


    if (
        !adNetworks ||
        !adNetworks.length
    ) {

        adNetworkList.innerHTML = `
            <div class="empty-state">
                No ad networks added yet.
            </div>
        `;

        return;
    }


    const list =
        document.createElement(
            "div"
        );


    list.className =
        "admin-list";


    adNetworks.forEach(
        network => {

            if (!network) {
                return;
            }


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "admin-list-item";


            item.innerHTML = `
                <div class="admin-list-main">

                    <div class="admin-list-title">
                        ${escapeHTML(
                            network.name || ""
                        )}
                    </div>

                    <div class="admin-list-meta">
                        ${escapeHTML(
                            network.code || ""
                        )}
                    </div>

                </div>


                <div class="admin-list-actions">

                    <button
                        type="button"
                        class="action-button delete"
                        onclick="deleteAdNetwork('${escapeAttribute(
                            network.id
                        )}')"
                    >
                        Delete
                    </button>

                </div>
            `;


            list.appendChild(
                item
            );

        }
    );


    adNetworkList.appendChild(
        list
    );

}


/* =========================================================
   DELETE AD NETWORK
========================================================= */

async function deleteAdNetwork(
    id
) {

    const network =
        adNetworks.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!network) {

        alert(
            "Ad network not found."
        );

        return;
    }


    const confirmed =
        confirm(
            `Delete "${network.name}"?\n\nOnly this ad network will be deleted.`
        );


    if (!confirmed) {
        return;
    }


    try {

        const {
            data,
            error
        } = await supabaseClient.rpc(
            "delete_ad_network",
            {
                p_id: id
            }
        );


        if (error) {
            throw error;
        }


        /*
         * IMPORTANT:
         * Do NOT filter adNetworks manually.
         * Do NOT call saveData().
         * Reload the complete list from Supabase.
         */

        localStorage.removeItem(
            "softwez_ad_networks"
        );


        await loadAdNetworks();


        alert(
            "Ad network deleted successfully."
        );


    } catch (error) {

        console.error(
            "Ad network delete error:",
            error
        );


        alert(
            "Ad network could not be deleted.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );

    }

}
/* =========================================================
   LOAD AD NETWORKS
========================================================= */

async function loadAdNetworks() {

    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("ad_networks")
            .select(
                `
                id,
                name,
                code,
                is_active,
                created_at
                `
            )
            .eq(
                "is_active",
                true
            )
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {
            throw error;
        }


        /* =========================================
           DATABASE IS THE SOURCE OF TRUTH
        ========================================= */

        adNetworks =
            data || [];


        /* =========================================
           REMOVE OLD LOCAL STORAGE DATA
        ========================================= */

        localStorage.removeItem(
            "softwez_ad_networks"
        );


        /* =========================================
           RENDER
        ========================================= */

        renderAdNetworks();


    } catch (error) {

        console.error(
            "Ad networks loading error:",
            error
        );


        adNetworks =
            [];


        renderAdNetworks();

    }

}
async function loadToolStats() {

    try {

        // TOTAL TOOLS
        const {
            count: totalToolsCount,
            error: toolsCountError
        } = await supabaseClient
            .from("tools")
            .select(
                "id",
                {
                    count: "exact",
                    head: true
                }
            );


        if (toolsCountError) {
            throw toolsCountError;
        }


        toolsTotal =
            totalToolsCount || 0;


        // TOTAL SPONSORED TOOLS
        const {
            count: totalSponsoredCount,
            error: sponsoredCountError
        } = await supabaseClient
            .from("tools")
            .select(
                "id",
                {
                    count: "exact",
                    head: true
                }
            )
            .eq(
                "is_sponsored",
                true
            );


        if (sponsoredCountError) {
            throw sponsoredCountError;
        }


        sponsoredTotal =
            totalSponsoredCount || 0;


        // UPDATE DASHBOARD
        renderStats();


        console.log(
            `Tool stats loaded | Total: ${toolsTotal} | Sponsored: ${sponsoredTotal}`
        );


    } catch (error) {

        console.error(
            "Tool stats loading error:",
            error
        );


        toolsTotal = 0;

        sponsoredTotal = 0;


        renderStats();

    }
}
function renderStats() {

    const totalTools =
        document.getElementById(
            "totalTools"
        );

    const totalCategories =
        document.getElementById(
            "totalCategories"
        );

    const totalSponsored =
        document.getElementById(
            "totalSponsored"
        );

    const totalAffiliate =
        document.getElementById(
            "totalAffiliate"
        );


    if (totalTools) {

        totalTools.textContent =
            toolsTotal;

    }


    if (totalCategories) {

        totalCategories.textContent =
            categories.length;

    }


    if (totalSponsored) {

        totalSponsored.textContent =
            sponsoredTotal;

    }


    if (totalAffiliate) {

        totalAffiliate.textContent =
            Object.keys(
                affiliateLinks
            ).length;

    }

}

function formatDate(
    value
) {
    if (!value) {
        return "—";
    }

    const date =
        new Date(value);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "—";
    }

    return date.toLocaleDateString(
        "en-US",
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );
}

function escapeHTML(
    value
) {
    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );
}

function escapeAttribute(
    value
) {
    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        );
}

function renderAll() {

    renderCategorySelect();

    renderSubcategoryCategorySelect();

    renderTools();

    renderCategories();

    renderSponsoredToolSelect();

    renderSponsoredCampaigns();

    renderSponsoredAnalytics();

    renderAffiliateToolSelect();

    renderAffiliateList();

    renderAdNetworks();

    renderStats();

    renderPendingSubmissions();

    updatePendingCounts();
}
async function loadAffiliateLinks() {

    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("affiliate_links")
            .select(`
                tool_id,
                affiliate_url,
                is_active,
                tools (
                    id,
                    name,
                    category
                )
            `);

        if (error) {
            throw error;
        }


        affiliateLinks = {};

        affiliateToolData = {};


        (data || []).forEach(
            item => {

                if (
                    item.is_active === true &&
                    item.tool_id &&
                    item.affiliate_url
                ) {

                    affiliateLinks[
                        item.tool_id
                    ] =
                        item.affiliate_url;


                    affiliateToolData[
                        item.tool_id
                    ] =
                        item.tools || null;

                }

            }
        );


        localStorage.removeItem(
            "softwez_affiliate"
        );


        renderAffiliateList();

        renderStats();


    } catch (error) {

        console.error(
            "Affiliate links loading error:",
            error
        );

        affiliateLinks = {};

        affiliateToolData = {};

        renderAffiliateList();

        renderStats();

    }

}
async function loadToolsFromSupabase() {
    try {

        const from =
            toolsPage * TOOLS_PER_PAGE;

        const to =
            from + TOOLS_PER_PAGE - 1;


        let query = supabaseClient
            .from("tools")
            .select(
                `
                id,
                name,
                description,
                link,
                category,
                subcategory,
                is_sponsored,
                created_at
                `,
                {
                    count: "exact"
                }
            );


        // =========================================
        // SEARCH
        // =========================================

        const search =
            String(activeSearchQuery || "")
                .replace(/[%,()]/g, " ")
                .replace(/\*/g, " ")
                .replace(/\s+/g, " ")
                .trim();


        if (search) {

            query = query.or(
                `name.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%,subcategory.ilike.%${search}%,link.ilike.%${search}%`
            );

        }


        // =========================================
        // LOAD CURRENT PAGE
        // =========================================

        const {
            data,
            error,
            count
        } = await query
            .order(
                "created_at",
                {
                    ascending: false
                }
            )
            .range(
                from,
                to
            );


        if (error) {
            throw error;
        }


        tools =
            data || [];

        toolsTotal =
            count || 0;


        // =========================================
        // PAGE SAFETY
        // =========================================

        const totalPages =
            Math.max(
                1,
                Math.ceil(
                    toolsTotal /
                    TOOLS_PER_PAGE
                )
            );


        if (
            toolsPage >= totalPages &&
            toolsPage > 0
        ) {

            toolsPage =
                totalPages - 1;

            return await loadToolsFromSupabase();

        }


        // =========================================
        // RENDER
        // =========================================

        renderAll();


        console.log(
            `Loaded ${tools.length} tools | Page ${toolsPage + 1}/${totalPages} | Total ${toolsTotal}`
        );


    } catch (error) {

        console.error(
            "Supabase tools loading error:",
            error
        );


        tools = [];

        toolsTotal = 0;


        renderAll();


        alert(
            "Failed to load tools.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );

    }

}
hideToolForm();

loadCategories();

renderAll();

loadToolsFromSupabase();
loadToolStats();
loadAdNetworks();
loadAffiliateLinks();
loadPendingSubmissions();
/* =========================================================
   LOGOUT
========================================================= */

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async () => {

            logoutBtn.disabled = true;
            logoutBtn.textContent = "Logging out...";

            try {

                await supabaseClient.auth.signOut();

                        } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

            }

            window.location.replace(
                "login.html"
            );

        }
    );

}