/* =========================================================
   SOFTWEZ
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   RESOURCE DATA
========================================================= */

let resources = [

    /* ================= AI ================= */

    {
        name: "Hugging Face",
        domain: "huggingface.co",
        category: "AI",
        subcategory: "AI Models",
        description: "Open-source AI models, datasets and demos for builders.",
        tag: "AI / ML"
    },

    {
        name: "Google Colab",
        domain: "colab.research.google.com",
        category: "AI",
        subcategory: "AI & Data",
        description: "Free cloud notebooks for Python, machine learning and data science.",
        tag: "Data Science"
    },

    {
        name: "Ollama",
        domain: "ollama.com",
        category: "AI",
        subcategory: "AI Coding",
        description: "Run open AI models locally on your computer.",
        tag: "Local AI"
    },

    {
        name: "Kaggle",
        domain: "kaggle.com",
        category: "AI",
        subcategory: "AI & Data",
        description: "Datasets, notebooks and machine learning resources.",
        tag: "Data Science"
    },

    {
        name: "Google AI Studio",
        domain: "aistudio.google.com",
        category: "AI",
        subcategory: "AI Tools",
        description: "Build and prototype applications with Google's AI models.",
        tag: "AI Development"
    },

    {
        name: "NotebookLM",
        domain: "notebooklm.google.com",
        category: "AI",
        subcategory: "AI Writing",
        description: "AI-powered research and note-taking tool.",
        tag: "Research"
    },

    {
        name: "ChatGPT",
        domain: "chatgpt.com",
        category: "AI",
        subcategory: "AI Tools",
        description: "AI assistant with a free access option.",
        tag: "AI Assistant"
    },

    {
        name: "Gemini",
        domain: "gemini.google.com",
        category: "AI",
        subcategory: "AI Tools",
        description: "Google's AI assistant with free access options.",
        tag: "AI Assistant"
    },

    {
        name: "Claude",
        domain: "claude.ai",
        category: "AI",
        subcategory: "AI Writing",
        description: "AI assistant with free access options.",
        tag: "AI Assistant"
    },

    {
        name: "ElevenLabs",
        domain: "elevenlabs.io",
        category: "AI",
        subcategory: "AI Audio",
        description: "AI voice and audio tools with a free access option.",
        tag: "AI Audio"
    },

    {
        name: "Suno",
        domain: "suno.com",
        category: "AI",
        subcategory: "AI Audio",
        description: "AI music generation with free access options.",
        tag: "AI Music"
    },

    {
        name: "Runway",
        domain: "runwayml.com",
        category: "AI",
        subcategory: "AI Video",
        description: "AI video creation tools with a free access option.",
        tag: "AI Video"
    },


    /* ================= SOFTWARE ================= */

    {
        name: "OBS Studio",
        domain: "obsproject.com",
        category: "Software",
        subcategory: "Video Software",
        description: "Free open-source software for recording and live streaming.",
        tag: "Video"
    },

    {
        name: "Blender",
        domain: "blender.org",
        category: "Software",
        subcategory: "Creative Software",
        description: "Free open-source 3D creation suite.",
        tag: "3D"
    },

    {
        name: "GIMP",
        domain: "gimp.org",
        category: "Software",
        subcategory: "Creative Software",
        description: "Free open-source image editor.",
        tag: "Image Editing"
    },

    {
        name: "Krita",
        domain: "krita.org",
        category: "Software",
        subcategory: "Creative Software",
        description: "Free professional digital painting software.",
        tag: "Creative"
    },

    {
        name: "Audacity",
        domain: "audacityteam.org",
        category: "Software",
        subcategory: "Video Software",
        description: "Free open-source audio recording and editing software.",
        tag: "Audio"
    },

    {
        name: "VLC",
        domain: "videolan.org",
        category: "Software",
        subcategory: "Video Software",
        description: "Free open-source multimedia player.",
        tag: "Media Player"
    },

    {
        name: "7-Zip",
        domain: "7-zip.org",
        category: "Software",
        subcategory: "Utilities",
        description: "Free open-source file archiver.",
        tag: "Utility"
    },

    {
        name: "HandBrake",
        domain: "handbrake.fr",
        category: "Software",
        subcategory: "Video Software",
        description: "Free open-source video transcoder.",
        tag: "Video"
    },

    {
        name: "FFmpeg",
        domain: "ffmpeg.org",
        category: "Software",
        subcategory: "Video Software",
        description: "Free multimedia framework for video and audio.",
        tag: "Video"
    },

    {
        name: "Kdenlive",
        domain: "kdenlive.org",
        category: "Software",
        subcategory: "Video Software",
        description: "Free open-source video editor.",
        tag: "Video Editing"
    },

    {
        name: "Joplin",
        domain: "joplinapp.org",
        category: "Software",
        subcategory: "Productivity",
        description: "Free open-source note-taking application.",
        tag: "Notes"
    },


    /* ================= COURSES ================= */

    {
        name: "MIT OpenCourseWare",
        domain: "ocw.mit.edu",
        category: "Courses",
        subcategory: "University Courses",
        description: "Free university-level course materials from MIT.",
        tag: "Education"
    },

    {
        name: "freeCodeCamp",
        domain: "freecodecamp.org",
        category: "Courses",
        subcategory: "Programming",
        description: "Free coding curriculum covering web development and data.",
        tag: "Learning"
    },

    {
        name: "The Odin Project",
        domain: "theodinproject.com",
        category: "Courses",
        subcategory: "Programming",
        description: "Free full-stack web development curriculum.",
        tag: "Web Development"
    },

    {
        name: "CS50",
        domain: "cs50.harvard.edu",
        category: "Courses",
        subcategory: "Programming",
        description: "Harvard's free introduction to computer science.",
        tag: "Computer Science"
    },

    {
        name: "Full Stack Open",
        domain: "fullstackopen.com",
        category: "Courses",
        subcategory: "Programming",
        description: "Free modern web development course.",
        tag: "Web Development"
    },

    {
        name: "Roadmap.sh",
        domain: "roadmap.sh",
        category: "Courses",
        subcategory: "Programming",
        description: "Free developer roadmaps and learning paths.",
        tag: "Learning"
    },

    {
        name: "Exercism",
        domain: "exercism.org",
        category: "Courses",
        subcategory: "Programming",
        description: "Free coding practice and mentoring.",
        tag: "Coding"
    },

    {
        name: "SQLBolt",
        domain: "sqlbolt.com",
        category: "Courses",
        subcategory: "Programming",
        description: "Free interactive SQL lessons.",
        tag: "SQL"
    },

    {
        name: "OpenLearn",
        domain: "open.edu/openlearn",
        category: "Courses",
        subcategory: "University Courses",
        description: "Free learning resources from The Open University.",
        tag: "Education"
    },


    /* ================= BOOKS ================= */

    {
        name: "Project Gutenberg",
        domain: "gutenberg.org",
        category: "Books",
        subcategory: "Ebooks",
        description: "A huge library of free public-domain ebooks.",
        tag: "Reading"
    },

    {
        name: "Open Library",
        domain: "openlibrary.org",
        category: "Books",
        subcategory: "Ebooks",
        description: "An open searchable catalog of millions of books.",
        tag: "Books"
    },

    {
        name: "Internet Archive",
        domain: "archive.org",
        category: "Books",
        subcategory: "Public Domain",
        description: "Free digital library of books, media and historical resources.",
        tag: "Digital Library"
    },

    {
        name: "OpenStax",
        domain: "openstax.org",
        category: "Books",
        subcategory: "Academic",
        description: "Free peer-reviewed open textbooks.",
        tag: "Textbooks"
    },

    {
        name: "Arxiv",
        domain: "arxiv.org",
        category: "Books",
        subcategory: "Academic",
        description: "Free research papers across science and technology.",
        tag: "Research"
    },

    {
        name: "DOAB",
        domain: "doabooks.org",
        category: "Books",
        subcategory: "Academic",
        description: "Directory of open access academic books.",
        tag: "Open Access"
    },

    {
        name: "Eloquent JavaScript",
        domain: "eloquentjavascript.net",
        category: "Books",
        subcategory: "Technical",
        description: "Free modern JavaScript book.",
        tag: "JavaScript"
    },

    {
        name: "You Don't Know JS Yet",
        domain: "github.com/getify/You-Dont-Know-JS",
        category: "Books",
        subcategory: "Technical",
        description: "Free JavaScript book series.",
        tag: "JavaScript"
    },


    /* ================= DESIGN ================= */

    {
        name: "Google Fonts",
        domain: "fonts.google.com",
        category: "Design",
        subcategory: "Fonts",
        description: "Open-source fonts for websites, apps and creative projects.",
        tag: "Typography"
    },

    {
        name: "Figma Community",
        domain: "figma.com/community",
        category: "Design",
        subcategory: "Templates",
        description: "Free UI kits, wireframes, templates and design resources.",
        tag: "Design"
    },

    {
        name: "Canva",
        domain: "canva.com",
        category: "Design",
        subcategory: "Templates",
        description: "Free visual design tools and templates.",
        tag: "Design"
    },

    {
        name: "Penpot",
        domain: "penpot.app",
        category: "Design",
        subcategory: "UI / UX",
        description: "Open-source design and prototyping platform.",
        tag: "UI Design"
    },

    {
        name: "Excalidraw",
        domain: "excalidraw.com",
        category: "Design",
        subcategory: "UI / UX",
        description: "Free virtual whiteboard for diagrams and collaboration.",
        tag: "Whiteboard"
    },

    {
        name: "Lucide",
        domain: "lucide.dev",
        category: "Design",
        subcategory: "Icons",
        description: "Free open-source icon library.",
        tag: "Icons"
    },

    {
        name: "Heroicons",
        domain: "heroicons.com",
        category: "Design",
        subcategory: "Icons",
        description: "Free SVG icons by the Tailwind team.",
        tag: "Icons"
    },

    {
        name: "OpenMoji",
        domain: "openmoji.org",
        category: "Design",
        subcategory: "Icons",
        description: "Free open-source emoji library.",
        tag: "Emoji"
    },

    {
        name: "Coolors",
        domain: "coolors.co",
        category: "Design",
        subcategory: "UI / UX",
        description: "Color palette generation and design tools.",
        tag: "Colors"
    },


    /* ================= DEVELOPER ================= */

    {
        name: "GitHub",
        domain: "github.com",
        category: "Developer",
        subcategory: "Code & Repositories",
        description: "Millions of open-source projects, libraries and developer tools.",
        tag: "Open Source"
    },

    {
        name: "MDN Web Docs",
        domain: "developer.mozilla.org",
        category: "Developer",
        subcategory: "Developer Utilities",
        description: "Free documentation and learning resources for web technologies.",
        tag: "Documentation"
    },

    {
        name: "Stack Overflow",
        domain: "stackoverflow.com",
        category: "Developer",
        subcategory: "Developer Utilities",
        description: "Community knowledge for programming questions and answers.",
        tag: "Community"
    },

    {
        name: "Postman",
        domain: "postman.com",
        category: "Developer",
        subcategory: "API Tools",
        description: "Tools for building, testing and documenting APIs.",
        tag: "API"
    },

    {
        name: "Python",
        domain: "python.org",
        category: "Developer",
        subcategory: "Libraries",
        description: "Free programming language and extensive documentation.",
        tag: "Programming"
    },

    {
        name: "Node.js",
        domain: "nodejs.org",
        category: "Developer",
        subcategory: "Libraries",
        description: "Free open-source JavaScript runtime.",
        tag: "JavaScript"
    },

    {
        name: "React",
        domain: "react.dev",
        category: "Developer",
        subcategory: "Libraries",
        description: "Free documentation and learning resources for React.",
        tag: "Web Development"
    },

    {
        name: "Vue",
        domain: "vuejs.org",
        category: "Developer",
        subcategory: "Libraries",
        description: "Free open-source JavaScript framework.",
        tag: "Web Development"
    },

    {
        name: "Tailwind CSS",
        domain: "tailwindcss.com",
        category: "Developer",
        subcategory: "Libraries",
        description: "Utility-first CSS framework with free documentation.",
        tag: "CSS"
    },

    {
        name: "Vite",
        domain: "vite.dev",
        category: "Developer",
        subcategory: "Developer Utilities",
        description: "Fast frontend build tool and development server.",
        tag: "Tooling"
    },

    {
        name: "Git",
        domain: "git-scm.com",
        category: "Developer",
        subcategory: "Code & Repositories",
        description: "Free distributed version control system.",
        tag: "Version Control"
    },

    {
        name: "Cloudflare Pages",
        domain: "pages.cloudflare.com",
        category: "Developer",
        subcategory: "Hosting",
        description: "Static site hosting with a free plan.",
        tag: "Hosting"
    },

    {
        name: "Cloudflare Workers",
        domain: "workers.cloudflare.com",
        category: "Developer",
        subcategory: "Hosting",
        description: "Serverless edge compute with a free tier.",
        tag: "Edge"
    },

    {
        name: "Supabase",
        domain: "supabase.com",
        category: "Developer",
        subcategory: "Hosting",
        description: "Open-source backend platform with a free plan.",
        tag: "Backend"
    },

    {
        name: "SQLite",
        domain: "sqlite.org",
        category: "Developer",
        subcategory: "Libraries",
        description: "Free embedded SQL database.",
        tag: "Database"
    },


    /* ================= BUSINESS ================= */

    {
        name: "Google Search Console",
        domain: "search.google.com/search-console",
        category: "Business",
        subcategory: "Marketing",
        description: "Free tools for monitoring website search performance.",
        tag: "SEO"
    },

    {
        name: "Google Analytics",
        domain: "analytics.google.com",
        category: "Business",
        subcategory: "Marketing",
        description: "Free web analytics and reporting tools.",
        tag: "Analytics"
    },

    {
        name: "HubSpot Academy",
        domain: "academy.hubspot.com",
        category: "Business",
        subcategory: "Business",
        description: "Free online courses and certifications for business skills.",
        tag: "Training"
    },

    {
        name: "Y Combinator Library",
        domain: "ycombinator.com/library",
        category: "Business",
        subcategory: "Entrepreneurship",
        description: "Free startup advice and educational resources.",
        tag: "Startups"
    },

    {
        name: "Indie Hackers",
        domain: "indiehackers.com",
        category: "Business",
        subcategory: "Entrepreneurship",
        description: "Community and resources for independent founders.",
        tag: "Founders"
    },

    {
        name: "Product Hunt",
        domain: "producthunt.com",
        category: "Business",
        subcategory: "Entrepreneurship",
        description: "Discover new products and startup resources.",
        tag: "Products"
    },


    /* ================= MEDIA ================= */

    {
        name: "Unsplash",
        domain: "unsplash.com",
        category: "Media",
        subcategory: "Stock Media",
        description: "High-quality free images for creative projects.",
        tag: "Images"
    },

    {
        name: "Pexels",
        domain: "pexels.com",
        category: "Media",
        subcategory: "Stock Media",
        description: "Free stock photos and videos.",
        tag: "Stock Video"
    },

    {
        name: "Pixabay",
        domain: "pixabay.com",
        category: "Media",
        subcategory: "Stock Media",
        description: "Free images, videos, music and illustrations.",
        tag: "Stock Media"
    },

    {
        name: "Mixkit",
        domain: "mixkit.co",
        category: "Media",
        subcategory: "Stock Media",
        description: "Free stock video, music and creative assets.",
        tag: "Stock Media"
    },

    {
        name: "Free Music Archive",
        domain: "freemusicarchive.org",
        category: "Media",
        subcategory: "Music",
        description: "Free music resources from independent creators.",
        tag: "Music"
    },

    {
        name: "Freesound",
        domain: "freesound.org",
        category: "Media",
        subcategory: "Music",
        description: "Community sound library with free licensed sounds.",
        tag: "Sound Effects"
    }

];


/* =========================================================
   CATEGORY DATA
========================================================= */

let categoryData = {};

/* =========================================================
   STATE
========================================================= */

let activeCategory = "All";

let activeSubcategory = "All resources";

/*
    This is separate from activeCategory.

    activeCategory = which category is being filtered.

    openCategory = which category's subcategories
    are currently visible.
*/
let openCategory = null;

let visibleLimit = 50;

/*
    Search query that has actually been executed.

    The search box can contain new text, but the
    resource list will not change until Enter is pressed.
*/
let activeSearchQuery = "";

function goHome(event) {
    event.preventDefault();

    activeSearchQuery = "";
    activeCategory = "All";
    activeSubcategory = "All resources";
    openCategory = null;
    visibleLimit = 50;

    if (searchInput) {
        searchInput.value = "";
    }

    renderCategories();
    renderResources();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
/* =========================================================
   ELEMENTS
========================================================= */

const categoryList =
    document.getElementById("categoryList");

const resourceList =
    document.getElementById("resourceList");

const searchInput =
    document.getElementById("searchInput");

const resourceCount =
    document.getElementById("resourceCount");

const loadMoreButton =
    document.getElementById("loadMoreButton");

const emptyMessage =
    document.getElementById("emptyMessage");

const sidebar = document.getElementById("categories");
const sidebarTitle = sidebar?.querySelector(".sidebar-title");

if (sidebarTitle) {

    sidebarTitle.addEventListener("click", () => {

        if (window.innerWidth <= 850) {
            sidebar.classList.toggle("mobile-category-open");
        }

    });

}
/* =========================================================
   RENDER CATEGORIES
========================================================= */

function renderCategories() {

    let html = "";


    /* =====================================================
       ALL RESOURCES
    ====================================================== */

    html += `
        <div class="category-block ${
            activeCategory === "All" ? "open" : ""
        }">

            <button
                type="button"
                class="category-button ${
                    activeCategory === "All" ? "active" : ""
                }"
                data-category="All"
            >
                <span>
                    All resources
                </span>
            </button>

        </div>
    `;


    /* =====================================================
       MAIN CATEGORIES
    ====================================================== */

    Object.keys(categoryData).forEach(category => {

        const isActive =
            activeCategory === category;

        const isOpen =
            openCategory === category;


        html += `
            <div class="category-block ${
                isOpen ? "open" : ""
            }">

                <button
                    type="button"
                    class="category-button ${
                        isActive ? "active" : ""
                    }"
                    data-category="${category}"
                >

                    <span>
                        ${category}
                    </span>

                    <span class="chevron">
                        ›
                    </span>

                </button>


                <div class="subcategories">

                    <button
                        type="button"
                        class="subcategory ${
                            isActive &&
                            activeSubcategory === "All resources"
                                ? "active"
                                : ""
                        }"
                        data-category="${category}"
                        data-subcategory="All resources"
                    >
                        All ${category}
                    </button>


                    ${categoryData[category]
                        .map(subcategory => `
                            <button
                                type="button"
                                class="subcategory ${
                                    isActive &&
                                    activeSubcategory === subcategory
                                        ? "active"
                                        : ""
                                }"
                                data-category="${category}"
                                data-subcategory="${subcategory}"
                            >
                                ${subcategory}
                            </button>
                        `)
                        .join("")
                    }

                </div>

            </div>
        `;
    });


    categoryList.innerHTML = html;

    /* =====================================================
       CATEGORY BUTTON EVENTS
    ====================================================== */

    categoryList
        .querySelectorAll(
            ".category-button[data-category]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const category =
                        event.currentTarget.dataset.category;


                    /* -------------------------------------
                       ALL RESOURCES
                    -------------------------------------- */

                    if (category === "All") {

                        activeCategory = "All";

                        activeSubcategory =
                            "All resources";

                        openCategory = null;

                        visibleLimit = 50;

                        renderCategories();

                        renderResources();

                        return;
                    }


                    /* -------------------------------------
                       SAME CATEGORY = TOGGLE OPEN/CLOSE
                    -------------------------------------- */

                    if (openCategory === category) {

                        openCategory = null;

                        renderCategories();

                        return;
                    }


                    /* -------------------------------------
                       NEW CATEGORY
                    -------------------------------------- */

                    openCategory = category;

                    activeCategory = category;

                    activeSubcategory =
                        "All resources";

                    visibleLimit = 50;

                    renderCategories();

                    renderResources();

                }
            );

        });


    /* =====================================================
       SUBCATEGORY EVENTS
    ====================================================== */

    categoryList
        .querySelectorAll(
            ".subcategory[data-subcategory]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.stopPropagation();


                    const category =
                        event.currentTarget.dataset.category;

                    const subcategory =
                        event.currentTarget.dataset.subcategory;


                    activeCategory = category;

                    activeSubcategory =
                        subcategory;

                    openCategory = category;

                    visibleLimit = 50;

                    renderCategories();

                    renderResources();

                }
            );

        });

}


/* =========================================================
   FILTER RESOURCES
========================================================= */

function getFilteredResources() {

    /*
        IMPORTANT:

        Do NOT read searchInput.value here.

        Only activeSearchQuery is used.

        activeSearchQuery changes only when the user
        presses Enter in the search box.
    */

    const query =
        activeSearchQuery;


    return resources.filter(resource => {


        /* =================================================
           CATEGORY FILTER
        ================================================== */

  const categoryMatch =
    activeCategory === "All" ||
    String(resource.category || "").trim().toLowerCase() ===
    String(activeCategory || "").trim().toLowerCase();


/* =================================================
   SUBCATEGORY FILTER
================================================= */

const subcategoryMatch =
    activeSubcategory === "All resources" ||
    String(resource.subcategory || "").trim().toLowerCase() ===
    String(activeSubcategory || "").trim().toLowerCase();

        /* =================================================
           SEARCH
        ================================================== */

        const searchableText = [

            resource.name,

            resource.domain,

            resource.category,

            resource.subcategory,

            resource.description,

            resource.tag

        ]
            .join(" ")
            .toLowerCase();


        const searchMatch =
            !query ||
            searchableText.includes(query);


        return (
            categoryMatch &&
            subcategoryMatch &&
            searchMatch
        );

    });

}


/* =========================================================
   CREATE RESOURCE URL
========================================================= */

function getResourceUrl(url) {

    if (!url) {
        return "#";
    }

    const value = String(url).trim();

    if (!value) {
        return "#";
    }

    if (
        value.startsWith("http://") ||
        value.startsWith("https://")
    ) {
        return value;
    }

    return `https://${value}`;
}


/* =========================================================
   OUTPUT SAFETY
========================================================= */

function escapeHTML(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
    return escapeHTML(value)
        .replace(/`/g, "&#096;");
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
            )
            .eq(
                "is_active",
                true
            );

        if (error) {
            throw error;
        }

        window.softwezAffiliateLinks =
            {};

        (data || []).forEach(
            item => {

                window.softwezAffiliateLinks[
                    item.tool_id
                ] =
                    item.affiliate_url;

            }
        );

    } catch (error) {

        console.error(
            "Affiliate links loading error:",
            error
        );

        window.softwezAffiliateLinks =
            {};

    }

}
/* =========================================================
   AD NETWORKS
========================================================= */

async function loadAdNetworks() {

    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("ad_networks")
            .select(
                "id, name, code, is_active"
            )
            .eq(
                "is_active",
                true
            );

        if (error) {
            throw error;
        }

        window.softwezAdNetworks =
            data || [];

    } catch (error) {

        console.error(
            "Ad network loading error:",
            error
        );

        window.softwezAdNetworks =
            [];
    }

}
/* =========================================================
   SPONSORED CAMPAIGNS
========================================================= */

let sponsoredCampaigns = [];


/* =========================================================
   CHECK ACTIVE CAMPAIGN
========================================================= */

function isSponsoredCampaignActive(campaign) {

    if (!campaign || campaign.is_active !== true) {
        return false;
    }

    const now = new Date();

    if (
        campaign.start_at &&
        now < new Date(campaign.start_at)
    ) {
        return false;
    }

    if (
        campaign.end_at &&
        now > new Date(campaign.end_at)
    ) {
        return false;
    }

    if (
        campaign.click_limit !== null &&
        campaign.click_limit !== undefined &&
        Number(campaign.clicks || 0) >=
        Number(campaign.click_limit)
    ) {
        return false;
    }

    return true;
}


/* =========================================================
   LOAD SPONSORED CAMPAIGNS
========================================================= */

async function loadSponsoredCampaigns() {

    try {

        const { data, error } =
            await supabaseClient
                .from("sponsored_campaigns")
                .select(`
                    id,
                    tool_id,
                    campaign_type,
                    start_at,
                    end_at,
                    click_limit,
                    impressions,
                    clicks,
                    is_active,
                    tools (
                        id,
                        name,
                        description,
                        link,
                        category
                    )
                `)
                .eq("is_active", true);

        if (error) {
            throw error;
        }

        sponsoredCampaigns =
            (data || [])
                .filter(isSponsoredCampaignActive)
                .filter(campaign =>
                    campaign.tools &&
                    campaign.tools.id
                );

    } catch (error) {

        console.error(
            "Sponsored campaign loading error:",
            error
        );

        sponsoredCampaigns = [];
    }

}


/* =========================================================
   SHUFFLE SPONSORED CAMPAIGNS
========================================================= */

function shuffleSponsoredCampaigns(list) {

    const array = [...list];

    for (
        let i = array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            array[i],
            array[j]
        ] = [
            array[j],
            array[i]
        ];

    }

    return array;
}


/* =========================================================
   TRACK SPONSORED IMPRESSION
========================================================= */

async function trackSponsoredImpression(
    campaignId
) {

    if (!campaignId) {
        return;
    }

    try {

        await supabaseClient.rpc(
            "track_campaign_impression",
            {
                p_campaign_id: campaignId
            }
        );

    } catch (error) {

        console.error(
            "Sponsored impression tracking error:",
            error
        );

    }

}


/* =========================================================
   TRACK SPONSORED CLICK
========================================================= */

async function trackSponsoredClick(
    campaignId
) {

    if (!campaignId) {
        return;
    }

    try {

        await supabaseClient.rpc(
            "track_campaign_click",
            {
                p_campaign_id: campaignId
            }
        );

    } catch (error) {

        console.error(
            "Sponsored click tracking error:",
            error
        );

    }

}

/* =========================================================
   BUILD UNIFIED SPONSORED CONTENT
========================================================= */

function buildSponsoredContent(filteredResources) {

    const sponsoredContent = [];

    const campaignToolIds =
        new Set(
            sponsoredCampaigns
                .filter(isSponsoredCampaignActive)
                .map(campaign => campaign.tool_id)
        );


    /* =====================================================
       1. SPONSORED CAMPAIGNS
    ====================================================== */

    sponsoredCampaigns
        .filter(isSponsoredCampaignActive)
        .forEach(campaign => {

            const tool =
                filteredResources.find(
                    resource =>
                        resource.id === campaign.tool_id
                );

            if (!tool) {
                return;
            }

            sponsoredContent.push({

                type: "sponsored",

                id: tool.id,

                tool_id: tool.id,

                name: tool.name,

                domain: tool.domain,

                link: tool.link,

                description: tool.description,

                category: tool.category,

                subcategory: tool.subcategory,

                tag: tool.tag,

                campaignId: campaign.id,

                sponsored: true

            });

        });


    /* =====================================================
       2. AFFILIATE
    ====================================================== */

    filteredResources
        .filter(resource =>
            window.softwezAffiliateLinks &&
            window.softwezAffiliateLinks[
                resource.id
            ] &&
            !campaignToolIds.has(resource.id)
        )
        .forEach(resource => {

            sponsoredContent.push({

                type: "affiliate",

                id: resource.id,

                tool_id: resource.id,

                name: resource.name,

                domain: resource.domain,

                link:
                    window.softwezAffiliateLinks[
                        resource.id
                    ],

                description: resource.description,

                category: resource.category,

                subcategory: resource.subcategory,

                tag: resource.tag,

                campaignId: null,

                sponsored: true

            });

        });


    /* =====================================================
       3. AD NETWORK
    ====================================================== */

    (window.softwezAdNetworks || [])
    .filter(adNetwork =>
        adNetwork &&
        typeof adNetwork.code === "string" &&
        adNetwork.code.trim() !== ""
    )
    .forEach(adNetwork => {

        sponsoredContent.push({

                type: "ad_network",

                id:
                    `ad-network-${adNetwork.id}`,

                tool_id: null,

                name:
                    adNetwork.name || "Advertisement",

                domain: "",

                link: "#",

                description: "",

                category: "",

                subcategory: "Sponsored",

                tag: "Sponsored",

                campaignId: null,

                adNetwork: true,

                adCode:
                    adNetwork.code || "",

                sponsored: true

            });

        });


    return sponsoredContent;

}
/* =========================================================
   RENDER RESOURCES
========================================================= */

function renderResources() {

    const filtered =
        getFilteredResources();


    /* =====================================================
       EMPTY STATE
    ====================================================== */

    if (filtered.length === 0) {

        resourceCount.textContent =
            "0 resources";

        resourceList.innerHTML = "";

        emptyMessage.style.display =
            "block";

        loadMoreButton.style.display =
            "none";

        return;
    }


    emptyMessage.style.display =
        "none";


 /* =====================================================
   UNIFIED SPONSORED CONTENT
===================================================== */

const sponsoredItems =
    buildSponsoredContent(
        filtered
    );


const shuffledSponsoredContent =
    shuffleSponsoredCampaigns(
        sponsoredItems
    );

    /* =====================================================
   NORMAL RESOURCES
===================================================== */

const sponsoredToolIds =
    new Set(
        sponsoredItems
            .filter(item =>
                item.type !== "ad_network"
            )
            .map(item =>
                item.tool_id
            )
    );


/* =====================================================
   PREVENT DUPLICATE SPONSORED TOOLS
===================================================== */

const normalResources =
    filtered.filter(
        resource =>
            !sponsoredToolIds.has(
                resource.id
            )
    );


/* =====================================================
   BUILD FINAL LIST
===================================================== */

const finalResources = [];

let normalIndex = 0;
let sponsoredIndex = 0;

const maxItems =
    visibleLimit;


/* =====================================================
   RANDOM SPONSORED INTERVAL

   First sponsored item appears after
   3–4 normal resources.

   After that, every sponsored item
   appears after another 3–4 normal resources.
===================================================== */

let nextSponsoredAfter =
    3 + Math.floor(
        Math.random() * 2
    );


while (
    finalResources.length <
        maxItems &&
    (
        normalIndex <
            normalResources.length ||
        sponsoredIndex <
            shuffledSponsoredContent.length
    )
) {


    /* =================================================
       ADD NORMAL RESOURCE
    ================================================= */

    if (
        normalIndex <
        normalResources.length
    ) {

        finalResources.push({

            ...normalResources[
                normalIndex
            ],

            sponsored: false,

            campaignId: null

        });

        normalIndex++;


        /*
            After 3–4 normal resources,
            insert sponsored content.
        */

        if (
    normalIndex >=
        nextSponsoredAfter &&
    shuffledSponsoredContent.length > 0
) {

    const sponsoredItem =
        shuffledSponsoredContent[
            sponsoredIndex %
            shuffledSponsoredContent.length
        ];

    finalResources.push(
        sponsoredItem
    );

    sponsoredIndex++;

    nextSponsoredAfter =
        normalIndex +
        3 +
        Math.floor(
            Math.random() * 2
        );

}

    } else {

        /*
            No normal resources left.
            Add remaining sponsored content.
        */

        if (
            sponsoredIndex <
            shuffledSponsoredContent.length
        ) {

            finalResources.push(
                shuffledSponsoredContent[
                    sponsoredIndex
                ]
            );

            sponsoredIndex++;

        } else {

            break;

        }

    }

}


    /* =====================================================
       COUNT
    ====================================================== */

    resourceCount.textContent =
        `${filtered.length} resources`;


    /* =====================================================
   BUILD HTML
===================================================== */

let html = "";


finalResources.forEach(
    resource => {

        const isSponsored =
            resource.sponsored === true;

        const isAdNetwork =
            resource.adNetwork === true;


        /* =================================================
           AD NETWORK
        ================================================== */

        if (isAdNetwork) {

            html += `

                <div
                    class="resource sponsored ad-network-resource"
                    data-ad-network="true"
                >

                    <div class="sponsored-label">
                        Sponsored
                    </div>

                    <div class="ad-network-content">
                        ${resource.adCode || ""}
                    </div>

                </div>

            `;

            return;

        }


        /* =================================================
           NORMAL + SPONSORED + AFFILIATE
        ================================================== */

        html += `

            <a
                class="resource ${
                    isSponsored
                        ? "sponsored"
                        : ""
                }"

                href="${escapeAttribute(
                    getResourceUrl(
                        resource.link ||
                        resource.domain
                    )
                )}"

                target="_blank"

                rel="noopener noreferrer"

                onclick="
                    ${
                        resource.campaignId
                            ? `trackSponsoredClick('${escapeAttribute(
                                  resource.campaignId
                              )}')`
                            : ""
                    }

                    trackToolClick('${escapeAttribute(
                        resource.id || ""
                    )}')
                "
            >

                ${
                    isSponsored
                        ? `
                            <div class="sponsored-label">
                                Sponsored
                            </div>
                        `
                        : ""
                }


                <div class="resource-title-row">

                    <span class="resource-title">
                        ${escapeHTML(
                            resource.name
                        )}
                    </span>

                    <span class="resource-domain">
                        ${escapeHTML(
                            resource.domain
                        )}
                    </span>

                </div>


                <div class="resource-description">
                    ${escapeHTML(
                        resource.description
                    )}
                </div>

            </a>

        `;

    }
);


    resourceList.innerHTML =
    html;


/* =====================================================
   EXECUTE AD NETWORK SCRIPTS
===================================================== */

resourceList
    .querySelectorAll(
        ".ad-network-content script"
    )
    .forEach(
        oldScript => {

            const newScript =
                document.createElement(
                    "script"
                );


            /* Copy attributes */

            Array.from(
                oldScript.attributes
            ).forEach(
                attribute => {

                    newScript.setAttribute(
                        attribute.name,
                        attribute.value
                    );

                }
            );


            /* Copy inline script */

            newScript.textContent =
                oldScript.textContent;


            /* Replace old script */

            oldScript.parentNode.replaceChild(
                newScript,
                oldScript
            );

        }
    );

/* =====================================================
   DEBUG AD NETWORK
===================================================== */

setTimeout(() => {

    resourceList
        .querySelectorAll(
            ".ad-network-resource"
        )
        .forEach(
            (adContainer, index) => {

                const adContent =
                    adContainer.querySelector(
                        ".ad-network-content"
                    );

                console.log(
                    "SOFTWEZ AD DEBUG",
                    index,
                    {
                        html:
                            adContent
                                ? adContent.innerHTML
                                : null,

                        text:
                            adContent
                                ? adContent.textContent
                                : null,

                        children:
                            adContent
                                ? adContent.children.length
                                : 0,

                        height:
                            adContent
                                ? adContent.offsetHeight
                                : 0,

                        width:
                            adContent
                                ? adContent.offsetWidth
                                : 0
                    }
                );

            }
        );

}, 3000);
/* =====================================================
   AD NETWORK SLOT CLEANUP
===================================================== */

/*
   Generic ad networks may load asynchronously.

   Do not automatically remove ad slots based on
   timeout, iframe, text, image, canvas, or height.

   The ad network controls when the ad is rendered.
*/
    /* =====================================================
       TRACK IMPRESSIONS
    ====================================================== */

    finalResources
        .filter(
            resource =>
                resource.sponsored === true
        )
        .forEach(
            resource => {

                trackSponsoredImpression(
                    resource.campaignId
                );

            }
        );


    /* =====================================================
       LOAD MORE
    ====================================================== */

    if (
        visibleLimit <
        filtered.length
    ) {

        loadMoreButton.style.display =
            "inline-block";

    } else {

        loadMoreButton.style.display =
            "none";

    }

}


/* =========================================================
   SEARCH
========================================================= */

/*
    SEARCH BEHAVIOR:

    - Typing does NOTHING.
    - Search results stay unchanged while typing.
    - Pressing Enter executes the search.
    - After pressing Enter, the new query becomes active.
*/

searchInput.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();


        /*
            Store the query only when Enter is pressed.
        */

        activeSearchQuery =
            searchInput.value
                .trim()
                .toLowerCase();


        /*
            Reset pagination after every new search.
        */

        visibleLimit = 50;


        /*
            Now execute the search.
        */

        renderResources();

    }
);


/* =========================================================
   LOAD MORE
========================================================= */

loadMoreButton.addEventListener(
    "click",
    () => {

        visibleLimit += 50;

        renderResources();

    }
);


/* =========================================================
   RESOURCE SUBMISSION
========================================================= */

const submitModal =
    document.getElementById("submitModal");

const submitModalOverlay =
    document.getElementById("submitModalOverlay");

const submitModalClose =
    document.getElementById("submitModalClose");

const submitResourceForm =
    document.getElementById("submitResourceForm");

const submitUrl =
    document.getElementById("submitUrl");

const checkUrlButton =
    document.getElementById("checkUrlButton");

const urlCheckMessage =
    document.getElementById("urlCheckMessage");

const submissionDetails =
    document.getElementById("submissionDetails");

const submitName =
    document.getElementById("submitName");

const submitDescription =
    document.getElementById("submitDescription");

const submitCategory =
    document.getElementById("submitCategory");

const submitSubcategory =
    document.getElementById("submitSubcategory");

const submitResourceButton =
    document.getElementById("submitResourceButton");

const submitResult =
    document.getElementById("submitResult");


let checkedSubmissionDomain = null;
let submissionUrlApproved = false;


/* =========================================================
   OPEN MODAL
========================================================= */

function showSubmitMessage() {

    submitModal.classList.add("open");

    submitModal.setAttribute(
        "aria-hidden",
        "false"
    );

    resetSubmissionForm();

    setTimeout(() => {

        submitUrl.focus();

    }, 50);

}


/* =========================================================
   CLOSE MODAL
========================================================= */

function closeSubmitModal() {

    submitModal.classList.remove("open");

    submitModal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   RESET FORM
========================================================= */

function resetSubmissionForm() {

    submitResourceForm.reset();

    checkedSubmissionDomain = null;

    submissionUrlApproved = false;

    urlCheckMessage.textContent = "";

    urlCheckMessage.className =
        "url-check-message";

    submitResult.textContent = "";

    submitResult.className =
        "submit-result";

    submissionDetails.classList.add(
        "disabled"
    );

    submitName.disabled = true;

    submitDescription.disabled = true;

    submitCategory.disabled = true;

    submitResourceButton.disabled = true;

    checkUrlButton.disabled = false;

    checkUrlButton.textContent =
        "Check URL";

    populateSubmissionCategories();

}


/* =========================================================
   POPULATE CATEGORIES
========================================================= */

function populateSubmissionCategories() {

    if (!submitCategory) {
        return;
    }

    submitCategory.innerHTML = `
        <option value="">
            Select a category
        </option>
    `;

    Object.keys(categoryData).forEach(
        category => {

            const option =
                document.createElement("option");

            option.value = category;

            option.textContent = category;

            submitCategory.appendChild(
                option
            );

        }
    );

}
function populateSubmissionSubcategories() {

    if (!submitSubcategory) {
        return;
    }

    const selectedCategory =
        submitCategory?.value || "";

    submitSubcategory.innerHTML = `
        <option value="">
            Select a subcategory
        </option>
    `;

    if (!selectedCategory) {

        submitSubcategory.disabled = true;

        return;
    }

    const subcategories =
        categoryData[selectedCategory] || [];

    if (!subcategories.length) {

        submitSubcategory.innerHTML = `
            <option value="">
                No subcategories available
            </option>
        `;

        submitSubcategory.disabled = true;

        return;
    }

    subcategories.forEach(
        subcategory => {

            const option =
                document.createElement("option");

            option.value =
                subcategory;

            option.textContent =
                subcategory;

            submitSubcategory.appendChild(
                option
            );

        }
    );

    submitSubcategory.disabled = false;
}

submitCategory.addEventListener(
    "change",
    populateSubmissionSubcategories
);

/* =========================================================
   SHOW URL MESSAGE
========================================================= */

function showUrlCheckMessage(
    message,
    type
) {

    urlCheckMessage.textContent =
        message;

    urlCheckMessage.className =
        `url-check-message show ${type}`;

}


/* =========================================================
   CHECK URL
========================================================= */

async function checkSubmissionUrl() {

    const url =
        submitUrl.value.trim();


    if (!url) {

        showUrlCheckMessage(
            "Please enter a website URL.",
            "error"
        );

        return;
    }


    checkUrlButton.disabled = true;

    checkUrlButton.textContent =
        "Checking...";


    submissionUrlApproved = false;

    checkedSubmissionDomain = null;


    submissionDetails.classList.add(
        "disabled"
    );


    submitName.disabled = true;

    submitDescription.disabled = true;

    submitCategory.disabled = true;

    submitSubcategory.disabled = true;

    submitResourceButton.disabled = true;


    try {

        /* =================================================
           VALIDATE URL
        ================================================= */

        let normalizedDomain = "";

        try {

            normalizedDomain =
                new URL(url)
                    .hostname
                    .replace(/^www\./, "")
                    .toLowerCase();

        } catch (error) {

            showUrlCheckMessage(
                "Please enter a valid website URL.",
                "error"
            );

            return;
        }


        /* =================================================
           CHECK EXISTING TOOL
        ================================================= */

        const {
            data,
            error
        } = await supabaseClient
            .from("tools")
            .select("id, link")
            .eq("link", url)
            .limit(1);


        if (error) {
            throw error;
        }


        /* =================================================
           ALREADY EXISTS
        ================================================= */

        if (
            data &&
            data.length > 0
        ) {

            showUrlCheckMessage(
                "This URL is already available on Softwez.",
                "error"
            );

            return;
        }


        /* =================================================
           URL APPROVED
        ================================================= */

        checkedSubmissionDomain =
            normalizedDomain;

        submissionUrlApproved =
            true;


        showUrlCheckMessage(
            "✓ URL is available for submission.",
            "success"
        );


        submissionDetails.classList.remove(
            "disabled"
        );


        submitName.disabled =
            false;

        submitDescription.disabled =
            false;

        submitCategory.disabled =
            false;

        submitSubcategory.disabled =
            false;


        submitResourceButton.disabled =
            false;


        checkUrlButton.textContent =
            "Checked";


    } catch (error) {

        console.error(
            "URL checking error:",
            error
        );


        submissionUrlApproved =
            false;

        checkedSubmissionDomain =
            null;


        showUrlCheckMessage(
            "Unable to check this URL right now. Please try again.",
            "error"
        );


    } finally {

        checkUrlButton.disabled =
            false;

    }

}
/* =========================================================
   URL CHECK BUTTON
========================================================= */

checkUrlButton.addEventListener(
    "click",
    checkSubmissionUrl
);


/* =========================================================
   URL ENTER KEY
========================================================= */

submitUrl.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        checkSubmissionUrl();

    }
);


/* =========================================================
   URL CHANGE
   Re-check required if visitor changes URL
========================================================= */

submitUrl.addEventListener(
    "input",
    () => {

        submissionUrlApproved = false;

        checkedSubmissionDomain = null;

        submissionDetails.classList.add(
            "disabled"
        );

        submitName.disabled = true;

        submitDescription.disabled = true;

        submitCategory.disabled = true;

        submitResourceButton.disabled = true;

        urlCheckMessage.textContent = "";

        urlCheckMessage.className =
            "url-check-message";

        checkUrlButton.disabled = false;

        checkUrlButton.textContent =
            "Check URL";

    }
);


/* =========================================================
   SUBMIT RESOURCE
========================================================= */

submitResourceForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();


        /* =====================================================
           VALIDATION
        ===================================================== */

        if (!submissionUrlApproved) {

            showUrlCheckMessage(
                "Please check and verify your website URL first.",
                "error"
            );

            return;
        }


        const name =
            submitName.value.trim();

        const description =
            submitDescription.value.trim();

        const category =
            submitCategory.value;

        const subcategory =
            submitSubcategory.value;

        const url =
            submitUrl.value.trim();


        if (!name) {

            submitName.focus();

            return;
        }


        if (!description) {

            submitDescription.focus();

            return;
        }


        if (!category) {

            submitCategory.focus();

            return;
        }


        if (!subcategory) {

            submitSubcategory.focus();

            return;
        }


        if (!checkedSubmissionDomain) {

            showUrlCheckMessage(
                "Please check and verify your website URL first.",
                "error"
            );

            return;
        }


        /* =====================================================
           SUBMITTING STATE
        ===================================================== */

        submitResourceButton.disabled = true;

        submitResourceButton.textContent =
            "Submitting...";

        submitResult.textContent = "";

        submitResult.className =
            "submit-result";


        /* =====================================================
           SUBMIT
        ===================================================== */

        try {

            const {
                data,
                error
            } =
                await supabaseClient.functions.invoke(
                    "submit-tool",
                    {
                        body: {
                            name: name,
                            description: description,
                            url: url,
                            normalized_domain:
                                checkedSubmissionDomain,
                            category: category,
                            subcategory:
                                subcategory
                        }
                    }
                );


            /* =================================================
               FUNCTION ERROR
            ================================================= */

            if (error) {

                let errorMessage =
                    "Unable to submit this resource right now. Please try again.";


                try {

                    if (
                        error.context &&
                        typeof error.context.json ===
                            "function"
                    ) {

                        const responseData =
                            await error.context.json();


                        if (
                            responseData &&
                            responseData.error
                        ) {

                            errorMessage =
                                responseData.error;

                        }

                    }

                } catch (
                    responseError
                ) {

                    console.error(
                        "Submission error response parsing failed:",
                        responseError
                    );

                }


                throw new Error(
                    errorMessage
                );
            }


            /* =================================================
               INVALID FUNCTION RESPONSE
            ================================================= */

            if (
                !data ||
                data.success !== true
            ) {

                throw new Error(
                    "Unable to submit this resource right now. Please try again."
                );
            }


            /* =================================================
               SUCCESS
            ================================================= */

            submitResult.textContent =
                "✓ Submitted successfully. Your resource is now pending review by the Softwez team.";

            submitResult.className =
                "submit-result show success";


            submitResourceForm.reset();


            submissionUrlApproved =
                false;

            checkedSubmissionDomain =
                null;


            submissionDetails.classList.add(
                "disabled"
            );


            submitName.disabled =
                true;

            submitDescription.disabled =
                true;

            submitCategory.disabled =
                true;

            submitSubcategory.disabled =
                true;


            submitResourceButton.disabled =
                true;


            checkUrlButton.textContent =
                "Check URL";


            /* =================================================
               RESET URL STATE
            ================================================= */

            showUrlCheckMessage(
                "",
                ""
            );


        } catch (error) {

            console.error(
                "Submission error:",
                error
            );


            submitResult.textContent =
                error?.message ||
                "Unable to submit this resource right now. Please try again.";


            submitResult.className =
                "submit-result show error";


        } finally {

            submitResourceButton.disabled =
                true;

            submitResourceButton.textContent =
                "Submit for review";

        }

    }
);
/* =========================================================
   CLOSE EVENTS
========================================================= */

submitModalClose.addEventListener(
    "click",
    closeSubmitModal
);


submitModalOverlay.addEventListener(
    "click",
    closeSubmitModal
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            submitModal.classList.contains("open")
        ) {

            closeSubmitModal();

        }

    }
);


/* =========================================================
   LOAD RESOURCES FROM SUPABASE
========================================================= */

async function loadResources() {

    try {

        const { data, error } =
            await supabaseClient
                .from("tools")
                .select("*")
                .order("created_at", {
                    ascending: false
                });


        if (error) {
            throw error;
        }


        /*
           Supabase is the single source of truth.

           Clear any hardcoded/stale resource data
           before applying the latest database result.
        */
        resources = [];


        if (data && data.length > 0) {

            resources = data.map(tool => {

                let domain = tool.link || "";

                try {

                    domain =
                        new URL(tool.link).hostname
                            .replace(/^www\./, "");

                } catch (error) {

                    domain = tool.link || "";

                }


                return {

                    name:
                        tool.name || "",

                    id:
                        tool.id,

                    domain,

                    link:
                        tool.link || "",

                    category:
                        tool.category || "",

                    subcategory:
                        tool.subcategory || "All resources",

                    description:
                        tool.description || "",

                    tag:
                        tool.tag || tool.category || ""

                };

            });

        }


        renderCategories();

        renderResources();


        console.log(
            `Loaded ${resources.length} resources from Supabase.`
        );

    } catch (error) {

        console.error(
            "Supabase loading error:",
            error
        );


        /*
           Never show stale hardcoded resources
           when Supabase fails.

           The database is the source of truth.
        */
        resources = [];


        renderCategories();

        renderResources();

    }

}

/* =========================================================
   INITIALIZE
========================================================= */

async function loadCategories() {

    const { data, error } = await supabaseClient
        .from("categories")
        .select(`
            id,
            name,
            subcategories (
                id,
                name
            )
        `)
        .order("name");

    if (error) {
        console.error("Category loading error:", error);
        return;
    }

    categoryData = {};

    data.forEach(category => {

        categoryData[category.name] =
            (category.subcategories || [])
                .map(item => item.name);

    });

    renderCategories();
}

(async () => {

    await loadCategories();

    await loadAffiliateLinks();

    await loadSponsoredCampaigns();

    await loadAdNetworks();

    await loadResources();

})();
/* =========================================================
   ANALYTICS — VISITOR TRACKING
========================================================= */

async function trackAnalytics() {

    try {

        let visitorId =
            localStorage.getItem(
                "softwez_visitor_id"
            );

        if (!visitorId) {

            visitorId =
                crypto.randomUUID();

            localStorage.setItem(
                "softwez_visitor_id",
                visitorId
            );
        }


        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        const lastUniqueVisit =
            localStorage.getItem(
                "softwez_last_unique_visit"
            );


        let country = "Unknown";


        try {

            const response =
                await fetch(
                    "https://ipapi.co/json/"
                );

            if (response.ok) {

                const data =
                    await response.json();

                country =
                    data.country_name ||
                    "Unknown";
            }

        } catch (error) {

            console.warn(
                "Country detection failed:",
                error
            );
        }


        /* TOTAL VISITS */

        const { error: pageViewError } =
            await supabaseClient
                .from("analytics_events")
                .insert([
                    {
                        visitor_id: visitorId,
                        event_type: "page_view",
                        country: country
                    }
                ]);


        if (pageViewError) {
            throw pageViewError;
        }


        /* UNIQUE VISITOR */

        if (lastUniqueVisit !== today) {

            const { error: visitError } =
                await supabaseClient
                    .from("analytics_events")
                    .insert([
                        {
                            visitor_id: visitorId,
                            event_type: "visit",
                            country: country
                        }
                    ]);


            if (visitError) {
                throw visitError;
            }


            localStorage.setItem(
                "softwez_last_unique_visit",
                today
            );
        }


    } catch (error) {

        console.error(
            "Analytics tracking error:",
            error
        );

    }

}


/* Start analytics */

trackAnalytics();
/* =========================================================
   ANALYTICS — TOOL CLICK
========================================================= */

async function trackToolClick(toolId) {

    try {

        const visitorId =
            localStorage.getItem(
                "softwez_visitor_id"
            );

        if (!visitorId || !toolId) {
            return;
        }

        const { error } =
            await supabaseClient
                .from("analytics_events")
                .insert([
                    {
                        visitor_id: visitorId,
                        event_type: "tool_click",
                        tool_id: toolId
                    }
                ]);

        if (error) {
            console.error(
                "Tool click tracking error:",
                error
            );
        }

    } catch (error) {

        console.error(
            "Tool click analytics error:",
            error
        );

    }

}