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

const categoryData = {

    "AI": [
        "AI Tools",
        "AI Models",
        "AI Writing",
        "AI Image",
        "AI Video",
        "AI Audio",
        "AI Coding",
        "AI & Data"
    ],

    "Software": [
        "Desktop Apps",
        "Video Software",
        "Creative Software",
        "Utilities",
        "Productivity"
    ],

    "Courses": [
        "Programming",
        "Business",
        "Design",
        "AI & Data",
        "University Courses"
    ],

    "Books": [
        "Ebooks",
        "Academic",
        "Public Domain",
        "Technical"
    ],

    "Design": [
        "Templates",
        "Fonts",
        "Images",
        "UI / UX",
        "Icons"
    ],

    "Developer": [
        "Code & Repositories",
        "API Tools",
        "Libraries",
        "Hosting",
        "Developer Utilities"
    ],

    "Business": [
        "Marketing",
        "Business",
        "Entrepreneurship"
    ],

    "Media": [
        "Stock Media",
        "Music"
    ]

};


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
            resource.category === activeCategory;


        /* =================================================
           SUBCATEGORY FILTER
        ================================================== */

        const subcategoryMatch =
            activeSubcategory === "All resources" ||
            resource.subcategory === activeSubcategory;


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

function getResourceUrl(domain) {

    if (!domain) {
        return "#";
    }

    if (
        domain.startsWith("http://") ||
        domain.startsWith("https://")
    ) {
        return domain;
    }

    return `https://${domain}`;

}


/* =========================================================
   RENDER RESOURCES
========================================================= */

function renderResources() {

    const filtered =
        getFilteredResources();


    /* =====================================================
       VISIBLE RESOURCES
    ====================================================== */

    const visible =
        filtered.slice(
            0,
            visibleLimit
        );


    /* =====================================================
       COUNT
    ====================================================== */

    resourceCount.textContent =
        `${filtered.length} resources`;


    /* =====================================================
       EMPTY STATE
    ====================================================== */

    if (filtered.length === 0) {

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
       BUILD RESOURCE HTML
    ====================================================== */

    let html = "";


    visible.forEach(
        (resource, index) => {


            /*
                SPONSORED PATTERN

                Position 1  = Sponsored
                Position 2-5 = Normal
                Position 6  = Sponsored
                Position 7-10 = Normal
                Position 11 = Sponsored

                Pattern:

                Sponsored
                Normal
                Normal
                Normal
                Normal
                Sponsored
                Normal
                Normal
                Normal
                Normal
                Sponsored
                ...
            */

            const isSponsored =
                index === 0 ||
                index % 5 === 0;


            html += `
                <a
                    class="resource ${
                        isSponsored
                            ? "sponsored"
                            : ""
                    }"
                    href="${getResourceUrl(resource.domain)}"
                    target="_blank"
                    rel="noopener noreferrer"
                >

                    ${
                        isSponsored
                            ? `
                                <div class="sponsored-label">
                                    Sponsored Resource
                                </div>
                            `
                            : ""
                    }


                    <div class="resource-title-row">

                        <span class="resource-title">
                            ${resource.name}
                        </span>

                        <span class="resource-domain">
                            ${resource.domain}
                        </span>

                    </div>


                    <div class="resource-description">
                        ${resource.description}
                    </div>


                    <div class="resource-tags">

                        <span class="tag">
                            ${resource.category}
                        </span>

                        <span class="tag">
                            ${resource.tag}
                        </span>

                    </div>

                </a>
            `;

        }
    );


    resourceList.innerHTML =
        html;


    /* =====================================================
       LOAD MORE BUTTON
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
   SUBMIT BUTTON
========================================================= */

function showSubmitMessage() {

    alert(
        "The resource submission system will be connected later."
    );

}


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
                    ascending: true
                });


        if (error) {
            throw error;
        }


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

                    domain,

                    link:
                        tool.link || "",

                    category:
                        tool.category || "",

                    subcategory:
                        "All resources",

                    description:
                        tool.description || "",

                    tag:
                        tool.category || ""

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
           If Supabase fails,
           existing local resource data
           will remain available.
        */

        renderCategories();

        renderResources();

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

loadResources();