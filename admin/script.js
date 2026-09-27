/* =========================================================
   SOFTWEZ ADMIN PANEL
========================================================= */


/* =========================================================
   INITIAL DATA
========================================================= */

const defaultCategories = [
    "AI",
    "Software",
    "Courses",
    "Books",
    "Design",
    "Developer",
    "Business",
    "Media"
];


let tools = JSON.parse(
    localStorage.getItem("softwez_tools") || "[]"
);


let categories = JSON.parse(
    localStorage.getItem("softwez_categories") ||
    JSON.stringify(defaultCategories)
);


let affiliateLinks = JSON.parse(
    localStorage.getItem("softwez_affiliate") || "{}"
);


let sponsoredTools = JSON.parse(
    localStorage.getItem("softwez_sponsored") || "[]"
);


let adNetworks = JSON.parse(
    localStorage.getItem("softwez_ad_networks") || "[]"
);


/* =========================================================
   DOM ELEMENTS
========================================================= */

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


const toolsTableBody =
    document.getElementById("toolsTableBody");


const toolSearch =
    document.getElementById("toolSearch");


/*
   IMPORTANT

   This stores ONLY the last query that was
   actually submitted by pressing Enter.

   Typing inside the search box does not
   change this value.
*/
let activeSearchQuery = "";


const categoryForm =
    document.getElementById("categoryForm");


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


/* =========================================================
   STORAGE
========================================================= */

function saveData() {

    localStorage.setItem(
        "softwez_tools",
        JSON.stringify(tools)
    );


    localStorage.setItem(
        "softwez_categories",
        JSON.stringify(categories)
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


/* =========================================================
   NAVIGATION
========================================================= */

function openSection(sectionId) {

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

        categories: "Categories",

        sponsored: "Sponsored",

        affiliate: "Affiliate",

        ads: "Ad Network"

    };


    pageTitle.textContent =
        titles[sectionId] || "Dashboard";


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


navItems.forEach(item => {

    item.addEventListener("click", () => {

        const section =
            item.dataset.section;


        openSection(section);

    });

});


/* =========================================================
   QUICK ACTIONS
========================================================= */

document
    .querySelectorAll(".quick-action")
    .forEach(button => {

        button.addEventListener("click", () => {

            const section =
                button.dataset.go;


            openSection(section);

        });

    });


/* =========================================================
   TOOL FORM VISIBILITY
========================================================= */

function showToolForm() {

    toolFormCard.style.display =
        "block";


    toolForm.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


function hideToolForm() {

    toolFormCard.style.display =
        "none";


    toolForm.reset();

}


addToolButton.addEventListener(
    "click",
    showToolForm
);


cancelToolButton.addEventListener(
    "click",
    hideToolForm
);


/* =========================================================
   CATEGORY SELECT
========================================================= */

function renderCategorySelect() {

    toolCategory.innerHTML = `

        <option value="">
            Select category
        </option>

    `;


    categories.forEach(category => {

        const option =
            document.createElement("option");


        option.value =
            category;


        option.textContent =
            category;


        toolCategory.appendChild(
            option
        );

    });

}


/* =========================================================
   ADD TOOL
========================================================= */

toolForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        const name =
            document
                .getElementById("toolName")
                .value
                .trim();


        const description =
            document
                .getElementById("toolDescription")
                .value
                .trim();


        const link =
            document
                .getElementById("toolLink")
                .value
                .trim();


        const category =
            document
                .getElementById("toolCategory")
                .value;


        if (
            !name ||
            !description ||
            !link ||
            !category
        ) {

            alert(
                "Please fill in all fields."
            );

            return;

        }


        const newTool = {

            name,

            description,

            link,

            category

        };


        const {
            data,
            error
        } = await supabaseClient

            .from("tools")

            .insert([newTool])

            .select()

            .single();


        if (error) {

            console.error(
                "Supabase insert error:",
                error
            );

            alert(
                "Failed to add tool."
            );

            return;

        }


        tools.unshift(data);


        saveData();


        renderAll();


        toolForm.reset();


        hideToolForm();


        alert(
            "Tool added successfully."
        );

    }
);


/* =========================================================
   RENDER TOOLS
========================================================= */

function renderTools(searchTerm = "") {

    toolsTableBody.innerHTML = "";


    const search =
        String(searchTerm || "")
            .toLowerCase()
            .trim();


    const searchWords =
        search
            ? search.split(/\s+/)
            : [];


    const filteredTools =
        tools.filter(tool => {

            /*
               No submitted query:
               show all tools.
            */

            if (!search) {

                return true;

            }


            /*
               Search fields:

               1. Tool name
               2. Description
               3. Category
               4. Link

               Metadata and tag are NOT used.
            */

            const searchableText = [

                tool.name,

                tool.description,

                tool.category,

                tool.link

            ]

                .filter(Boolean)

                .join(" ")

                .toLowerCase();


            /*
               Every word in the query
               must exist in the tool data.
            */

            return searchWords.every(
                word =>
                    searchableText.includes(word)
            );

        });


    /*
       No result.
    */

    if (filteredTools.length === 0) {

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


    /*
       Render tools.
    */

    filteredTools.forEach(tool => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <div class="tool-name">

                    ${escapeHTML(tool.name)}

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

                        class="action-button"

                        onclick="toggleSponsored('${tool.id}')"

                    >

                        ${
                            sponsoredTools.includes(
                                tool.id
                            )

                                ? "Sponsored"

                                : "Sponsor"
                        }

                    </button>


                    <button

                        class="action-button delete"

                        onclick="deleteTool('${tool.id}')"

                    >

                        Delete

                    </button>


                </div>

            </td>

        `;


        toolsTableBody.appendChild(row);

    });

}


/* =========================================================
   TOOL SEARCH
========================================================= */

let activeSearchQuery = "";


/*
   Typing does NOTHING.

   Search happens ONLY when Enter is pressed.
*/
toolSearch.addEventListener("keydown", function (event) {

    if (event.key !== "Enter") {
        return;
    }

    event.preventDefault();

    activeSearchQuery =
        toolSearch.value.trim();

    renderTools(activeSearchQuery);

});

/* =========================================================
   DELETE TOOL
========================================================= */

async function deleteTool(id) {

    const tool =
        tools.find(
            item => item.id === id
        );


    if (!tool) {

        return;

    }


    const confirmed =
        confirm(
            `Delete "${tool.name}"?`
        );


    if (!confirmed) {

        return;

    }


    try {

        const {
            error
        } = await supabaseClient

            .from("tools")

            .delete()

            .eq("id", id);


        if (error) {

            throw error;

        }


        tools =
            tools.filter(
                item =>
                    item.id !== id
            );


        sponsoredTools =
            sponsoredTools.filter(
                item =>
                    item !== id
            );


        delete affiliateLinks[id];


        saveData();


        renderAll();


        alert(
            "Tool deleted successfully."
        );


    } catch (error) {

        console.error(
            "Supabase delete error:",
            error
        );


        alert(
            "Failed to delete tool."
        );

    }

}


/* =========================================================
   SPONSORED TOGGLE
========================================================= */

async function toggleSponsored(id) {

    const tool =
        tools.find(
            item => item.id === id
        );


    if (!tool) {

        return;

    }


    const newSponsoredStatus =
        !tool.is_sponsored;


    try {

        const {
            data,
            error
        } = await supabaseClient

            .from("tools")

            .update({

                is_sponsored:
                    newSponsoredStatus

            })

            .eq("id", id)

            .select()

            .single();


        if (error) {

            throw error;

        }


        tools =
            tools.map(item =>

                item.id === id

                    ? data

                    : item

            );


        if (newSponsoredStatus) {

            if (
                !sponsoredTools.includes(id)
            ) {

                sponsoredTools.push(id);

            }

        } else {

            sponsoredTools =
                sponsoredTools.filter(
                    item =>
                        item !== id
                );

        }


        saveData();


        renderAll();


    } catch (error) {

        console.error(
            "Supabase sponsored update error:",
            error
        );


        alert(
            "Failed to update sponsored status."
        );

    }

}


/* =========================================================
   RENDER SPONSORED
========================================================= */

function renderSponsored() {

    sponsoredList.innerHTML = "";


    const sponsored =
        tools.filter(tool =>
            sponsoredTools.includes(
                tool.id
            )
        );


    if (sponsored.length === 0) {

        sponsoredList.innerHTML = `

            <div class="empty-state">

                No sponsored tools yet.

            </div>

        `;

        return;

    }


    const list =
        document.createElement("div");


    list.className =
        "admin-list";


    sponsored.forEach(tool => {

        const item =
            document.createElement("div");


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
                        tool.category
                    )}

                </div>

            </div>


            <div class="admin-list-actions">

                <button

                    class="action-button"

                    onclick="toggleSponsored('${tool.id}')"

                >

                    Remove

                </button>

            </div>

        `;


        list.appendChild(item);

    });


    sponsoredList.appendChild(list);

}


/* =========================================================
   ADD CATEGORY
========================================================= */

categoryForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const input =
            document.getElementById(
                "categoryName"
            );


        const name =
            input.value.trim();


        if (!name) {

            return;

        }


        const exists =
            categories.some(
                category =>
                    category.toLowerCase() ===
                    name.toLowerCase()
            );


        if (exists) {

            alert(
                "This category already exists."
            );

            return;

        }


        categories.push(name);


        saveData();


        input.value = "";


        renderAll();


        alert(
            "Category added successfully."
        );

    }
);


/* =========================================================
   RENDER CATEGORIES
========================================================= */

function renderCategories() {

    categoryAdminList.innerHTML = "";


    if (categories.length === 0) {

        categoryAdminList.innerHTML = `

            <div class="empty-state">

                No categories found.

            </div>

        `;

        return;

    }


    categories.forEach(category => {

        const item =
            document.createElement("div");


        item.className =
            "category-admin-item";


        item.innerHTML = `

            <div class="category-admin-name">

                ${escapeHTML(category)}

            </div>


            <div class="category-admin-actions">

                <button

                    class="action-button delete"

                    onclick="deleteCategory('${escapeAttribute(category)}')"

                >

                    Delete

                </button>

            </div>

        `;


        categoryAdminList.appendChild(item);

    });

}


/* =========================================================
   DELETE CATEGORY
========================================================= */

function deleteCategory(category) {

    const used =
        tools.some(
            tool =>
                tool.category === category
        );


    if (used) {

        alert(
            "This category is being used by one or more tools. Remove or change those tools first."
        );

        return;

    }


    const confirmed =
        confirm(
            `Delete "${category}" category?`
        );


    if (!confirmed) {

        return;

    }


    categories =
        categories.filter(
            item =>
                item !== category
        );


    saveData();


    renderAll();

}


/* =========================================================
   AFFILIATE TOOL SELECT
========================================================= */

function renderAffiliateToolSelect() {

    affiliateTool.innerHTML = `

        <option value="">

            Select tool

        </option>

    `;


    tools.forEach(tool => {

        const option =
            document.createElement("option");


        option.value =
            tool.id;


        option.textContent =
            tool.name;


        affiliateTool.appendChild(
            option
        );

    });

}


/* =========================================================
   SAVE AFFILIATE LINK
========================================================= */

affiliateForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const toolId =
            affiliateTool.value;


        const link =
            document
                .getElementById(
                    "affiliateLink"
                )
                .value
                .trim();


        if (!toolId || !link) {

            alert(
                "Please select a tool and enter an affiliate link."
            );

            return;

        }


        affiliateLinks[toolId] =
            link;


        saveData();


        renderAll();


        affiliateForm.reset();


        alert(
            "Affiliate link saved successfully."
        );

    }
);


/* =========================================================
   RENDER AFFILIATE LIST
========================================================= */

function renderAffiliateList() {

    affiliateList.innerHTML = "";


    const entries =
        Object.entries(
            affiliateLinks
        );


    if (entries.length === 0) {

        affiliateList.innerHTML = `

            <div class="empty-state">

                No affiliate tools yet.

            </div>

        `;

        return;

    }


    const list =
        document.createElement("div");


    list.className =
        "admin-list";


    entries.forEach(
        ([toolId, link]) => {

            const tool =
                tools.find(
                    item =>
                        item.id === toolId
                );


            if (!tool) {

                return;

            }


            const item =
                document.createElement("div");


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

                        ${escapeHTML(link)}

                    </div>

                </div>


                <div class="admin-list-actions">

                    <button

                        class="action-button delete"

                        onclick="removeAffiliate('${tool.id}')"

                    >

                        Remove

                    </button>

                </div>

            `;


            list.appendChild(item);

        }
    );


    affiliateList.appendChild(list);

}


/* =========================================================
   REMOVE AFFILIATE
========================================================= */

function removeAffiliate(toolId) {

    delete affiliateLinks[toolId];


    saveData();


    renderAll();

}


/* =========================================================
   AD NETWORK
========================================================= */

adNetworkForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById(
                    "adNetworkName"
                )
                .value
                .trim();


        const code =
            document
                .getElementById(
                    "adNetworkCode"
                )
                .value
                .trim();


        if (!name || !code) {

            alert(
                "Please fill in both fields."
            );

            return;

        }


        adNetworks.push({

            id:
                Date.now().toString(),

            name,

            code,

            createdAt:
                new Date().toISOString()

        });


        saveData();


        renderAll();


        adNetworkForm.reset();


        alert(
            "Ad network saved successfully."
        );

    }
);


/* =========================================================
   RENDER AD NETWORKS
========================================================= */

function renderAdNetworks() {

    adNetworkList.innerHTML = "";


    if (adNetworks.length === 0) {

        adNetworkList.innerHTML = `

            <div class="empty-state">

                No ad networks added yet.

            </div>

        `;

        return;

    }


    const list =
        document.createElement("div");


    list.className =
        "admin-list";


    adNetworks.forEach(network => {

        const item =
            document.createElement("div");


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

                    class="action-button delete"

                    onclick="deleteAdNetwork('${network.id}')"

                >

                    Delete

                </button>

            </div>

        `;


        list.appendChild(item);

    });


    adNetworkList.appendChild(list);

}


/* =========================================================
   DELETE AD NETWORK
========================================================= */

function deleteAdNetwork(id) {

    const confirmed =
        confirm(
            "Delete this ad network?"
        );


    if (!confirmed) {

        return;

    }


    adNetworks =
        adNetworks.filter(
            network =>
                network.id !== id
        );


    saveData();


    renderAll();

}


/* =========================================================
   DASHBOARD STATS
========================================================= */

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


    totalTools.textContent =
        tools.length;


    totalCategories.textContent =
        categories.length;


    totalSponsored.textContent =
        sponsoredTools.length;


    totalAffiliate.textContent =
        Object.keys(
            affiliateLinks
        ).length;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHTML(value) {

    return String(value)

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


function escapeAttribute(value) {

    return String(value)

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   RENDER EVERYTHING
========================================================= */

function renderAll() {

    renderCategorySelect();


    /*
       IMPORTANT:

       Keep the last submitted search.

       If the user has typed something but
       has NOT pressed Enter, activeSearchQuery
       remains unchanged.

       Therefore typing never triggers filtering.
    */

    renderTools(
        activeSearchQuery
    );


    renderCategories();


    renderSponsored();


    renderAffiliateToolSelect();


    renderAffiliateList();


    renderAdNetworks();


    renderStats();

}


/* =========================================================
   INITIALIZE
========================================================= */

async function loadToolsFromSupabase() {

    try {

        const {
            data,
            error
        } = await supabaseClient

            .from("tools")

            .select("*")

            .order(
                "created_at",
                {
                    ascending: false
                }
            );


        if (error) {

            throw error;

        }


        if (data) {

            tools = data;


            renderAll();


            console.log(
                `Loaded ${tools.length} tools from Supabase.`
            );

        }


    } catch (error) {

        console.error(
            "Supabase loading error:",
            error
        );


        renderAll();

    }

}


hideToolForm();


loadToolsFromSupabase();