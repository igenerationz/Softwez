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
let tools = JSON.parse(localStorage.getItem("softwez_tools") || "[]");
let categories = [];
let subcategories = [];
let affiliateLinks = JSON.parse(localStorage.getItem("softwez_affiliate") || "{}");
let sponsoredTools = JSON.parse(localStorage.getItem("softwez_sponsored") || "[]");
let adNetworks = JSON.parse(localStorage.getItem("softwez_ad_networks") || "[]");
let pendingSubmissions = [];
let activeSearchQuery = "";
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
        "softwez_tools",
        JSON.stringify(tools)
    );
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

function checkAdminToolUrl() {

    const linkInput =
        document.getElementById(
            "toolLink"
        );

    const url =
        linkInput?.value.trim() || "";

    if (!url) {

        toolUrlCheckMessage.textContent =
            "Please enter a website URL.";

        toolUrlCheckMessage.className =
            "url-check-message error";

        toolUrlApproved = false;

        return;
    }

    checkToolUrlButton.disabled = true;

    checkToolUrlButton.textContent =
        "Checking...";

    toolUrlApproved = false;

    const duplicateTool =
        tools.find(
            tool =>
                String(
                    tool.link || ""
                ).trim() === url
        );

    setTimeout(() => {

        if (duplicateTool) {

            toolUrlCheckMessage.textContent =
                "✕ This exact URL already exists.";

            toolUrlCheckMessage.className =
                "url-check-message error";

            toolUrlApproved = false;

            checkToolUrlButton.disabled =
                false;

            checkToolUrlButton.textContent =
                "Check URL";

            return;
        }

        toolUrlCheckMessage.textContent =
            "✓ URL is available.";

        toolUrlCheckMessage.className =
            "url-check-message success";

        toolUrlApproved = true;

        checkToolUrlButton.disabled =
            false;

        checkToolUrlButton.textContent =
            "Checked";

    }, 300);

}

if (checkToolUrlButton) {

    checkToolUrlButton.addEventListener(
        "click",
        checkAdminToolUrl
    );

}

const adminToolLinkInput =
    document.getElementById(
        "toolLink"
    );

if (adminToolLinkInput) {

    adminToolLinkInput.addEventListener(
        "input",
        () => {

            toolUrlApproved = false;

            if (toolUrlCheckMessage) {

                toolUrlCheckMessage.textContent =
                    "";

                toolUrlCheckMessage.className =
                    "url-check-message";

            }

            if (checkToolUrlButton) {

                checkToolUrlButton.disabled =
                    false;

                checkToolUrlButton.textContent =
                    "Check URL";

            }

        }
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
            data,
            error
        } =
            await supabaseClient
                .from("tools")
                                .update({
                    name,
                    description,
                    link,
                    category,
                    subcategory
                })
                .eq("id", editingId)
                .select()
                .single();

if (error) {
    throw error;
}

if (data) {
    tools = tools.map(
        tool =>
            String(tool.id) === String(editingId)
                ? data
                : tool
    );
}

delete toolForm.dataset.editingId;

const submitButton =
    toolForm.querySelector(
        'button[type="submit"]'
    );

if (submitButton) {
    submitButton.textContent =
        "Add Tool";
}

saveData();
renderAll();
hideToolForm();

alert(
    "Tool updated successfully."
);

return;
}
const duplicateTool = tools.find(
    tool =>
        String(tool.link || "").trim() === link
);

if (duplicateTool) {
    alert(
        "This exact URL already exists."
    );
    return;
}

const {
    data,
    error
} =
    await supabaseClient
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

if (data) {
    tools.unshift(data);
}

saveData();
renderAll();
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

function renderTools(
    searchTerm = ""
) {
    if (!toolsTableBody) {
        return;
    }

    toolsTableBody.innerHTML = "";

    const search =
        String(searchTerm || "")
            .toLowerCase()
            .trim();

    const words =
        search
            ? search.split(/\s+/)
            : [];

    const filteredTools =
        tools.filter(tool => {
            if (!search) {
                return true;
            }

            const text = [
                tool.name,
                tool.description,
                tool.category,
                tool.link
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return words.every(
                word =>
                    text.includes(word)
            );
        });

    if (!filteredTools.length) {
        toolsTableBody.innerHTML = `
            <tr>
                <td colspan="4">
                    <div class="empty-state">
                        No tools found.
                    </div>
                </td>
            </tr>
        `;

        return;
    }

    filteredTools.forEach(tool => {
        const row =
            document.createElement(
                "tr"
            );

        row.innerHTML = `
            <td>
                <div class="tool-name">
                    ${escapeHTML(
                        tool.name
                    )}
                </div>

                <div class="tool-description">
                    ${escapeHTML(
                        tool.description
                    )}
                </div>
            </td>

            <td>
                <span class="category-badge">
                    ${escapeHTML(
                        tool.category || ""
                    )}
                </span>
            </td>

            <td>
                <a
                    class="table-link"
                    href="${escapeAttribute(
                        tool.link || ""
                    )}"
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

        toolsTableBody.appendChild(
            row
        );
    });
}

if (toolSearch) {
    toolSearch.addEventListener(
        "keydown",
        event => {
            if (
                event.key !==
                "Enter"
            ) {
                return;
            }

            event.preventDefault();

            activeSearchQuery =
                toolSearch.value.trim();

            renderTools(
                activeSearchQuery
            );
        }
    );
}

function editTool(id) {
    const tool = tools.find(
        item =>
            String(item.id) ===
            String(id)
    );

    if (!tool) {
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
}

async function deleteTool(id) {
    const tool =
        tools.find(
            item =>
                String(item.id) ===
                String(id)
        );

    if (!tool) {
        return;
    }

    if (
        !confirm(
            `Delete "${tool.name}"?`
        )
    ) {
        return;
    }

    try {
        const {
            error
        } =
            await supabaseClient
                .from("tools")
                .delete()
                .eq("id", id);

        if (error) {
            throw error;
        }

        tools =
            tools.filter(
                item =>
                    String(item.id) !==
                    String(id)
            );

        sponsoredTools =
            sponsoredTools.filter(
                item =>
                    String(item) !==
                    String(id)
            );

        delete affiliateLinks[id];

        saveData();
        renderAll();

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
        const {
            data,
            error
        } = await supabaseClient
            .from("sponsored_campaigns")
            .select(`
                *,
                tools (
                    id,
                    name,
                    description,
                    link,
                    category
                )
            `)
            .order(
                "created_at",
                {
                    ascending: false
                }
            );

        if (error) {
            throw error;
        }

        sponsoredCampaigns =
            data || [];

        renderSponsoredCampaigns();
        renderSponsoredAnalytics();

    } catch (error) {
        console.error(
            "Sponsored campaigns loading error:",
            error
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

    searchInput.oninput = () => {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();

        resultsContainer.innerHTML = "";

        if (!search) {
            return;
        }

        const words =
            search.split(/\s+/);

        const matchedTools =
            tools
                .filter(tool => {

                    const text = [
                        tool.name,
                        tool.description,
                        tool.category,
                        tool.subcategory,
                        tool.link
                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();

                    return words.every(
                        word =>
                            text.includes(word)
                    );
                })
                .slice(0, 20);

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

                    const result =
                        await supabaseClient
                            .from(
                                "sponsored_campaigns"
                            )
                            .update(payload)
                            .eq(
                                "id",
                                editingSponsoredCampaignId
                            )
                            .select(`
                                *,
                                tools (
                                    id,
                                    name,
                                    description,
                                    link,
                                    category
                                )
                            `)
                            .single();

                    data = result.data;
                    error = result.error;

                } else {

                    const result =
                        await supabaseClient
                            .from(
                                "sponsored_campaigns"
                            )
                            .insert([
                                {
                                    ...payload,
                                    is_active: true
                                }
                            ])
                            .select(`
                                *,
                                tools (
                                    id,
                                    name,
                                    description,
                                    link,
                                    category
                                )
                            `)
                            .single();

                    data = result.data;
                    error = result.error;
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
            data,
            error
        } =
            await supabaseClient
                .from(
                    "sponsored_campaigns"
                )
                .update({
                    is_active:
                        !shouldPause,

                    updated_at:
                        new Date()
                            .toISOString()
                })
                .eq(
                    "id",
                    campaignId
                )
                .select(`
                    *,
                    tools (
                        id,
                        name,
                        description,
                        link,
                        category
                    )
                `)
                .single();

        if (error) {
            throw error;
        }

        sponsoredCampaigns =
            sponsoredCampaigns.map(
                item =>
                    String(item.id) ===
                    String(campaignId)
                        ? data
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
            error
        } =
            await supabaseClient
                .from(
                    "sponsored_campaigns"
                )
                .delete()
                .eq(
                    "id",
                    campaignId
                );

        if (error) {
            throw error;
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
            error
        } = await supabaseClient
            .from(
                "sponsored_campaigns"
            )
            .update({
                is_active:
                    false,

                updated_at:
                    new Date()
                        .toISOString()
            })
            .eq(
                "id",
                campaignId
            );

        if (error) {
            throw error;
        }

        sponsoredCampaigns =
            sponsoredCampaigns.map(
                campaign =>
                    campaign.id ===
                    campaignId
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
                    "name",
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

    categoryAdminList.innerHTML =
        "";

    if (!categories.length) {
        categoryAdminList.innerHTML =
            `
            <div class="empty-state">
                No categories found.
            </div>
        `;

        return;
    }

    categories.forEach(
        category => {
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

            categoryAdminList.appendChild(
                wrapper
            );
        }
    );
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

    const used =
        tools.some(
            tool =>
                String(
                    tool.category || ""
                ).toLowerCase() ===
                String(
                    category.name
                ).toLowerCase()
        );

    if (used) {
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

    try {
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

    searchInput.oninput = () => {
        const search =
            searchInput.value
                .toLowerCase()
                .trim();

        resultsContainer.innerHTML = "";

        if (!search) {
            return;
        }

        const words =
            search.split(/\s+/);

        const matchedTools =
            tools
                .filter(tool => {
                    const text = [
                        tool.name,
                        tool.description,
                        tool.category,
                        tool.subcategory,
                        tool.link
                    ]
                        .filter(Boolean)
                        .join(" ")
                        .toLowerCase();

                    return words.every(
                        word =>
                            text.includes(word)
                    );
                })
                .slice(0, 20);

        if (!matchedTools.length) {
            resultsContainer.innerHTML = `
                <div class="affiliate-tool-no-results">
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
        });
    };

    searchInput.value = "";
    resultsContainer.innerHTML = "";
    selectedContainer.innerHTML = "";
    affiliateTool.value = "";
}
if (affiliateForm) {
    affiliateForm.addEventListener(
        "submit",
        async event => {
            event.preventDefault();

            if (!affiliateTool) {
                return;
            }

            const toolId =
                affiliateTool.value;

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

            affiliateLinks[toolId] =
    link;

saveData();

const {
    data,
    error
} = await supabaseClient
    .from("affiliate_links")
    .upsert(
        {
            tool_id: toolId,
            affiliate_url: link,
            is_active: true
        },
        {
            onConflict: "tool_id"
        }
    );

if (error) {
    console.error(
        "Affiliate save error:",
        error
    );

    alert(
        "Affiliate link could not be saved to database.\n\n" +
        error.message
    );

    return;
}

renderAll();

            affiliateForm.reset();

            alert(
                "Affiliate link saved successfully."
            );
        }
    );
}

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
                tools.find(
                    item =>
                        String(item.id) ===
                        String(toolId)
                );

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
                            tool.name
                        )}
                    </div>

                    <div class="admin-list-meta">
                        ${escapeHTML(
                            link
                        )}
                    </div>

                </div>

                <div class="admin-list-actions">

                    <button
                        type="button"
                        class="action-button delete"
                        onclick="removeAffiliate('${escapeAttribute(
                            tool.id
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

function removeAffiliate(
    toolId
) {
    delete affiliateLinks[
        toolId
    ];

    saveData();
    renderAll();
}

if (adNetworkForm) {
    adNetworkForm.addEventListener(
        "submit",
        async event => {
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
                } = await supabaseClient
                    .from("ad_networks")
                    .insert([
                        {
                            name,
                            code,
                            is_active: true
                        }
                    ])
                    .select()
                    .single();

                if (error) {
                    throw error;
                }

                if (data) {
                    adNetworks.push(data);
                }

                renderAll();

                adNetworkForm.reset();

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
        }
    );
}

function renderAdNetworks() {
    if (!adNetworkList) {
        return;
    }

    adNetworkList.innerHTML =
        "";

    if (!adNetworks.length) {
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
                            network.name
                        )}
                    </div>

                    <div class="admin-list-meta">
                        ${escapeHTML(
                            network.code
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

async function deleteAdNetwork(
    id
) {
    if (
        !confirm(
            "Delete this ad network?"
        )
    ) {
        return;
    }

    try {
        const {
            error
        } =
            await supabaseClient
                .from("ad_networks")
                .delete()
                .eq("id", id);

        if (error) {
            throw error;
        }

        adNetworks =
            adNetworks.filter(
                network =>
                    String(network.id) !==
                    String(id)
            );

        saveData();

        renderAdNetworks();

        alert(
            "Ad network deleted successfully."
        );

    } catch (error) {

        console.error(
            "Delete ad network error:",
            error
        );

        alert(
            "Failed to delete ad network.\n\n" +
            (
                error?.message ||
                "Unknown error"
            )
        );
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
            tools.length;
    }

    if (totalCategories) {
        totalCategories.textContent =
            categories.length;
    }

    if (totalSponsored) {
        totalSponsored.textContent =
            tools.filter(
                tool =>
                    Boolean(
                        tool.is_sponsored
                    )
            ).length;
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

    renderTools(
        activeSearchQuery
    );

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
            .select(
                "tool_id, affiliate_url, is_active"
            );

        if (error) {
            throw error;
        }

        const localLinks =
            JSON.parse(
                localStorage.getItem(
                    "softwez_affiliate"
                ) || "{}"
            );

        affiliateLinks =
            Object.keys(localLinks).length
                ? localLinks
                : {};

        (data || []).forEach(
            item => {

                if (
                    item.is_active === true
                ) {

                    affiliateLinks[
                        item.tool_id
                    ] =
                        item.affiliate_url;

                }

            }
        );

        renderAffiliateList();

    } catch (error) {

        console.error(
            "Affiliate links loading error:",
            error
        );

    }

}
async function loadToolsFromSupabase() {
    try {
        const {
            data,
            error
        } =
            await supabaseClient
                .from("tools")
                .select("*")
                .order(
                    "created_at",
                    {
                        ascending:
                            false
                    }
                );

        if (error) {
            throw error;
        }

        tools =
            data || [];

        sponsoredTools =
            tools
                .filter(
                    tool =>
                        Boolean(
                            tool.is_sponsored
                        )
                )
                .map(
                    tool =>
                        tool.id
                );

        saveData();
        renderAll();

        console.log(
            `Loaded ${tools.length} tools from Supabase.`
        );

    } catch (error) {
        console.error(
            "Supabase tools loading error:",
            error
        );

        renderAll();
    }
}
async function loadAdNetworks() {
    try {
        const {
            data,
            error
        } = await supabaseClient
            .from("ad_networks")
            .select("*")
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

        adNetworks =
            data || [];

        renderAdNetworks();

    } catch (error) {
        console.error(
            "Ad networks loading error:",
            error
        );

        renderAdNetworks();
    }
}
hideToolForm();

loadCategories();

renderAll();

loadToolsFromSupabase();
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