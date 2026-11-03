(function () {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    if (isDark) {
        document.documentElement.classList.add("dark");
        document.documentElement.style.backgroundColor = "#07131F";
    } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.backgroundColor = "#FAFBFD";
    }

    const savedDir = localStorage.getItem("taxora_direction") || "ltr";
    document.documentElement.setAttribute("dir", savedDir);

    const zeroFlashStyle = document.createElement("style");
    zeroFlashStyle.id = "taxora-zero-flash-styles";
    zeroFlashStyle.innerHTML = `
        * {
            -webkit-tap-highlight-color: transparent !important;
        }
        html {
            scroll-behavior: smooth !important;
            scroll-padding-top: 96px !important;
        }
        html.dark, html.dark body {
            background-color: #07131F !important;
            color-scheme: dark;
        }
        html:not(.dark), html:not(.dark) body {
            background-color: #FAFBFD !important;
            color-scheme: light;
        }

        /* Nav active states */
        header nav a.nav-active,
        header nav .group > button.nav-active,
        #mobileMenu a.nav-active {
            background-color: #123B5D !important;
            color: #ffffff !important;
            font-weight: 600 !important;
            box-shadow: 0 2px 8px rgba(18, 59, 93, 0.22) !important;
        }
        header nav a.nav-active:hover,
        header nav .group > button.nav-active:hover,
        #mobileMenu a.nav-active:hover {
            background-color: #0E2B45 !important;
            color: #ffffff !important;
        }
        html.dark header nav a.nav-active,
        html.dark header nav .group > button.nav-active,
        html.dark #mobileMenu a.nav-active {
            background-color: #2563EB !important;
            color: #ffffff !important;
            box-shadow: 0 2px 10px rgba(37, 99, 235, 0.35) !important;
        }
        html.dark header nav a.nav-active:hover,
        html.dark header nav .group > button.nav-active:hover,
        html.dark #mobileMenu a.nav-active:hover {
            background-color: #1D4ED8 !important;
            color: #ffffff !important;
        }

        /* Instant text colors for non-active nav links and dropdown buttons to prevent theme flash & lag */
        html.dark header nav a:not(.nav-active),
        html.dark header nav .group > button:not(.nav-active),
        html.dark #mobileMenu a:not(.nav-active),
        html.dark #mobileMenu .group > button:not(.nav-active) {
            color: #D1D5DB !important;
        }
        html:not(.dark) header nav a:not(.nav-active),
        html:not(.dark) header nav .group > button:not(.nav-active),
        html:not(.dark) #mobileMenu a:not(.nav-active),
        html:not(.dark) #mobileMenu .group > button:not(.nav-active) {
            color: #334155 !important;
        }
        html.dark header nav .group > button:not(.nav-active) span {
            color: #9CA3AF !important;
        }
        html:not(.dark) header nav .group > button:not(.nav-active) span {
            color: #64748B !important;
        }

        /* Instant LTR / Direction Toggle Button theme styles */
        html.dark .directionToggleBtn {
            color: #E5E7EB !important;
            background-color: #162B3D !important;
            border-color: #4B5563 !important;
        }
        html:not(.dark) .directionToggleBtn {
            color: #334155 !important;
            background-color: #FFFFFF !important;
            border-color: #E5E7EB !important;
        }

        /* Instant Theme Toggle button styles */
        html.dark .themeToggleBtn {
            background-color: #162B3D !important;
            border-color: #4B5563 !important;
        }
        html:not(.dark) .themeToggleBtn {
            background-color: #FFFFFF !important;
            border-color: #E5E7EB !important;
        }
        html.dark .themeToggleBtn > span:not(.themeKnob) {
            color: #D1D5DB !important;
        }
        html:not(.dark) .themeToggleBtn > span:not(.themeKnob) {
            color: #64748B !important;
        }
        html.dark .themeKnob {
            background-color: #2563EB !important;
            border: none !important;
            transform: translateX(42px) !important;
        }
        html:not(.dark) .themeKnob {
            background-color: #FFFFFF !important;
            border: none !important;
            transform: translateX(0px) !important;
        }

        /* Hover states for non-active items */
        html.dark header nav a:not(.nav-active):hover,
        html.dark header nav .group > button:not(.nav-active):hover {
            color: #FFFFFF !important;
            background-color: #162B3D !important;
        }
        html:not(.dark) header nav a:not(.nav-active):hover,
        html:not(.dark) header nav .group > button:not(.nav-active):hover {
            color: #123B5D !important;
            background-color: #EAF2F7 !important;
        }
        html.dark .directionToggleBtn:hover {
            color: #FFFFFF !important;
            background-color: #20394E !important;
        }
        html:not(.dark) .directionToggleBtn:hover {
            color: #123B5D !important;
            background-color: #EAF2F7 !important;
            border-color: #D5E3EC !important;
        }

        /* Instant Pricing Segment Toggle styles */
        html.dark .pricing-toggle-btn:not(.active-toggle) {
            color: #D1D5DB !important;
            background-color: transparent !important;
        }
        html:not(.dark) .pricing-toggle-btn:not(.active-toggle) {
            color: #64748B !important;
            background-color: transparent !important;
        }
        html.dark .pricing-toggle-btn.active-toggle {
            color: #FFFFFF !important;
            background-color: #2563EB !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }
        html:not(.dark) .pricing-toggle-btn.active-toggle {
            color: #FFFFFF !important;
            background-color: #123B5D !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }

        /* Instant Services Domain Filter button styles */
        html.dark .service-filter-btn:not(.active-service-btn) {
            color: #D1D5DB !important;
            background-color: #0D1B2A !important;
            border-color: #374151 !important;
        }
        html:not(.dark) .service-filter-btn:not(.active-service-btn) {
            color: #64748B !important;
            background-color: rgba(255, 255, 255, 0.9) !important;
            border-color: #E5E7EB !important;
        }
        html.dark .service-filter-btn.active-service-btn,
        html.dark .service-filter-btn.active-service-btn:hover {
            color: #FFFFFF !important;
            background-color: #2563EB !important;
            border-color: #2563EB !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }
        html:not(.dark) .service-filter-btn.active-service-btn,
        html:not(.dark) .service-filter-btn.active-service-btn:hover {
            color: #FFFFFF !important;
            background-color: #123B5D !important;
            border-color: #123B5D !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
        }

        /* Lightning fast instant transition on filter pills */
        .service-filter-btn {
            transition: transform 75ms ease, box-shadow 75ms ease !important;
        }

        /* Transition override: text color changes instantaneously on theme toggle with 0ms transition */
        header nav a,
        header nav .group > button,
        #mobileMenu a,
        #mobileMenu .group > button,
        .directionToggleBtn,
        .themeToggleBtn,
        .pricing-toggle-btn,
        .filter-btn {
            transition-property: background-color, border-color, box-shadow, transform !important;
            transition-duration: 150ms !important;
        }
    `;
    document.head.appendChild(zeroFlashStyle);
})();

(function injectFavicon() {
    const svgIcon = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%23123B5D'/><text x='50%' y='52%' dominant-baseline='central' text-anchor='middle' font-family='Arial, sans-serif' font-weight='900' font-size='24' fill='white'>₹</text></svg>`;
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
    }
    link.type = "image/svg+xml";
    link.href = svgIcon;
})();

window.switchTab = function (tabKey, btn) {
    const tabHeaders = {
        'overview': { title: 'System Overview', sub: "Here's your Taxora account summary." },
        'filings': { title: 'My Filings & Returns', sub: 'Past and active tax return filings.' },
        'vault': { title: 'Document Vault', sub: '256-bit encrypted storage repository.' },
        'advisory': { title: 'CA Advisory Desk', sub: 'Consultation booking with Chartered Accountants.' },
        'notices': { title: 'Notice Tracker', sub: 'Real-time ITD notice and compliance tracker.' },
        'settings': { title: 'Account Settings', sub: 'Manage personal details and credentials.' }
    };

    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
    });

    const target = document.getElementById('panel-' + tabKey);
    if (target) {
        target.style.display = 'block';
        target.classList.add('active');
    }

    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    sidebarBtns.forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const topHeading = document.getElementById('topHeading');
    const topSubtitle = document.getElementById('topSubtitle');
    if (topHeading && tabHeaders[tabKey]) {
        topHeading.innerText = tabHeaders[tabKey].title;
        const currentName = localStorage.getItem('taxora_client_name') || 'Rajesh';
        if (topSubtitle) {
            topSubtitle.innerHTML = `Welcome back, <span class="clientDisplayName">${currentName}</span>! ${tabHeaders[tabKey].sub}`;
        }
    }

    if (window.innerWidth < 1024 && typeof window.toggleSidebar === 'function') {
        window.toggleSidebar(false);
    }
};

window.switchAdminTab = function (tabKey, btn) {
    const adminHeaders = {
        'pipeline': { title: 'Operations Command Desk', sub: 'Firm Roster: Taxora Chambers • 24 Active Matters' },
        'retainers': { title: 'Active Retainers Roster', sub: 'Enterprise corporate clients under continuous retainer.' },
        'notices': { title: 'High-Risk Notice Desk', sub: 'Active scrutiny, demand notices, and ITAT litigation cases.' },
        'reconcile': { title: 'Reconciled Portfolios', sub: 'Automated 26AS, AIS, and GST reconciliation records.' },
        'drafts': { title: 'Pending Sign-Offs', sub: 'Refund claims and returns awaiting Partner CA digital seal.' },
        'settings': { title: 'Firm Settings', sub: 'Branch configurations, firm registration, and staff credentials.' }
    };

    const panels = document.querySelectorAll('.tab-panel');
    panels.forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
    });

    const target = document.getElementById('panel-' + tabKey);
    if (target) {
        target.style.display = 'block';
        target.classList.add('active');
    }

    const sidebarBtns = document.querySelectorAll('.sidebar-btn');
    sidebarBtns.forEach(b => b.classList.remove('active'));
    if (btn) {
        btn.classList.add('active');
    } else {
        const foundBtn = document.querySelector(`.sidebar-btn[onclick*="${tabKey}"]`);
        if (foundBtn) foundBtn.classList.add('active');
    }

    if (adminHeaders[tabKey]) {
        const heading = document.getElementById('adminHeading');
        const sub = document.getElementById('adminSubtitle');
        if (heading) heading.innerText = adminHeaders[tabKey].title;
        if (sub) sub.innerText = adminHeaders[tabKey].sub;
    }

    if (window.innerWidth < 1024 && typeof window.toggleSidebar === 'function') {
        window.toggleSidebar(false);
    }
};

window.toggleSidebar = function (open) {
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebarBackdrop');
    if (!sidebar) return;

    if (open) {
        sidebar.classList.remove('-translate-x-full');
        if (backdrop) backdrop.classList.remove('hidden');
    } else {
        sidebar.classList.add('-translate-x-full');
        if (backdrop) backdrop.classList.add('hidden');
    }
};

// 1. Single Centralized Theme Toggle Function
window.toggleDarkMode = function () {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    window.applyTheme(!isDark);
};

// 2. Exact Alignment & Visual Sync Function
window.applyTheme = function (isDark) {
    const html = document.documentElement;
    const themeKnobs = document.querySelectorAll(".themeKnob");

    if (isDark) {
        html.classList.add("dark");
        html.style.backgroundColor = "#07131F";
        localStorage.setItem("theme", "dark");
    } else {
        html.classList.remove("dark");
        html.style.backgroundColor = "#FAFBFD";
        localStorage.setItem("theme", "light");
    }

    themeKnobs.forEach(knob => {
        if (isDark) {
            knob.style.transform = "translateX(42px)";
            knob.style.backgroundColor = "#2563EB"; // Solid Taxora Tech Blue
            knob.style.border = "none";
        } else {
            knob.style.transform = "translateX(0px)";
            knob.style.backgroundColor = "#FFFFFF"; // Solid white
            knob.style.border = "none";
        }
    });
};

window.toggleDirection = function () {
    const html = document.documentElement;
    const currentDir = html.getAttribute("dir") || "ltr";
    const newDir = currentDir === "rtl" ? "ltr" : "rtl";
    html.setAttribute("dir", newDir);
    localStorage.setItem("taxora_direction", newDir);
    const directionToggleBtns = document.querySelectorAll(".directionToggleBtn");
    directionToggleBtns.forEach(btn => btn.textContent = newDir.toUpperCase());
};

window.showDashboardToast = function (msg) {
    const toast = document.getElementById('toastNotification');
    const toastMsg = document.getElementById('toastMsg') || document.getElementById('toastText');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.remove('translate-y-28', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-28', 'opacity-0');
    }, 3000);
};

window.showAdminToast = function (msg) {
    const toast = document.getElementById('adminToast');
    const toastText = document.getElementById('adminToastText');
    if (!toast || !toastText) return;
    toastText.textContent = msg;
    toast.classList.remove('translate-y-28', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-28', 'opacity-0');
    }, 3000);
};

window.exportCSVReport = function () {
    window.showAdminToast('Exporting Pipeline CSV report...');
};

window.handleCaseAction = function (button, action) {
    if (button) {
        button.textContent = "Done ✓";
        button.classList.remove("bg-[#123B5D]", "dark:bg-blue-600");
        button.classList.add("bg-emerald-600", "dark:bg-emerald-600");
    }
    window.showAdminToast(action + ' successfully!');
};

window.applyUpdatedName = function (newName) {
    if (!newName || !newName.trim()) return;
    const trimmedName = newName.trim();

    const userAvatarBadge = document.getElementById('userAvatarBadge');
    const userBadgeFullName = document.getElementById('userBadgeFullName');
    if (userAvatarBadge) userAvatarBadge.textContent = trimmedName.charAt(0).toUpperCase();
    if (userBadgeFullName) userBadgeFullName.textContent = trimmedName;

    document.querySelectorAll('.clientDisplayName').forEach(el => {
        el.textContent = trimmedName;
    });

    const inputField = document.getElementById('inputClientName');
    if (inputField) inputField.value = trimmedName;

    localStorage.setItem('taxora_client_name', trimmedName);
};

window.handleProfileUpdate = function (e) {
    if (e) e.preventDefault();
    const inputField = document.getElementById('inputClientName');
    if (inputField) {
        applyUpdatedName(inputField.value);
        showDashboardToast('Profile Name updated to "' + inputField.value.trim() + '"!');
    }
};

window.handleFirmSettingsUpdate = function (e) {
    if (e) e.preventDefault();
    const branchInput = document.getElementById('firmBranchInput');
    const branchVal = branchInput ? branchInput.value : 'Updated Branch';
    window.showAdminToast('Saved: ' + branchVal);
};

let currentPriorityFilter = 'all';

window.filterCases = function () {
    const searchInput = document.getElementById('adminSearchInput');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const rows = document.querySelectorAll('.case-row');

    rows.forEach(row => {
        const nameEl = row.querySelector('.client-name');
        const panEl = row.querySelector('.client-pan');
        const name = nameEl ? nameEl.textContent.toLowerCase() : '';
        const pan = panEl ? panEl.textContent.toLowerCase() : '';
        const rowPriority = row.getAttribute('data-priority') || '';

        const matchesQuery = !query || name.includes(query) || pan.includes(query);
        const matchesPriority = currentPriorityFilter === 'all' || rowPriority === currentPriorityFilter;

        row.style.display = (matchesQuery && matchesPriority) ? '' : 'none';
    });
};

window.setPriorityFilter = function (priority, btn) {
    currentPriorityFilter = priority;
    document.querySelectorAll('.priority-btn').forEach(b => {
        b.classList.remove('bg-[#123B5D]', 'dark:bg-blue-600', 'text-white', 'font-bold');
        b.classList.add('text-[#64748B]', 'dark:text-gray-400', 'font-semibold');
    });
    if (btn) {
        btn.classList.remove('text-[#64748B]', 'dark:text-gray-400', 'font-semibold');
        btn.classList.add('bg-[#123B5D]', 'dark:bg-blue-600', 'text-white', 'font-bold');
    }
    filterCases();
};

function initTaxora() {
    initInteractions();
    initAllPageFeatures();
    updateActiveNav();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTaxora);
} else {
    initTaxora();
}

function initAllPageFeatures() {
    initPricingToggle();
    initSessionFilters();
    initBlogFilters();
    initServicesFilters();
    initFaqFilters();
    initFaqAccordion();
    initHome2SlotButtons();
    initDashboardFeatures();
    initAdminFeatures();
    initPasswordToggles();
    initLoginForm();
    initRegisterForm();
}

function initDashboardFeatures() {
    const savedName = localStorage.getItem('taxora_client_name');
    if (savedName) {
        applyUpdatedName(savedName);
    }
}

function initAdminFeatures() {
    const defaultAdminBtn = document.querySelector(".sidebar-btn[onclick*='pipeline']");
    if (defaultAdminBtn) {
        window.switchAdminTab('pipeline', defaultAdminBtn);
    }

    const searchInput = document.getElementById("adminSearchInput");
    if (searchInput) {
        searchInput.oninput = window.filterCases;
    }
}

function initPricingToggle() {
    const btnInd = document.getElementById("btnIndividual");
    const btnBiz = document.getElementById("btnBusiness");
    const indCards = document.getElementById("individualCards");
    const bizCards = document.getElementById("businessCards");

    if (!btnInd || !btnBiz) return;

    btnInd.onclick = () => {
        btnBiz.classList.remove("active-toggle", "bg-[#123B5D]", "dark:bg-blue-600", "text-white", "font-bold", "shadow-md");
        btnBiz.classList.add("text-[#64748B]", "dark:text-gray-300", "font-semibold");

        btnInd.classList.remove("text-[#64748B]", "dark:text-gray-300", "font-semibold");
        btnInd.classList.add("active-toggle", "bg-[#123B5D]", "dark:bg-blue-600", "text-white", "font-bold", "shadow-md");

        if (bizCards) bizCards.classList.add("hidden");
        if (indCards) indCards.classList.remove("hidden");
    };

    btnBiz.onclick = () => {
        btnInd.classList.remove("active-toggle", "bg-[#123B5D]", "dark:bg-blue-600", "text-white", "font-bold", "shadow-md");
        btnInd.classList.add("text-[#64748B]", "dark:text-gray-300", "font-semibold");

        btnBiz.classList.remove("text-[#64748B]", "dark:text-gray-300", "font-semibold");
        btnBiz.classList.add("active-toggle", "bg-[#123B5D]", "dark:bg-blue-600", "text-white", "font-bold", "shadow-md");

        if (indCards) indCards.classList.add("hidden");
        if (bizCards) bizCards.classList.remove("hidden");
    };
}

function initSessionFilters() {
    const filterButtons = document.querySelectorAll("#sessionFilterGroup button");
    const sessionCards = document.querySelectorAll("#sessionCardsList .session-item");
    const cardsContainer = document.getElementById("sessionCardsList");

    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
        btn.onclick = () => {
            const filterValue = btn.getAttribute("data-filter") || "all";

            filterButtons.forEach(b => {
                b.classList.remove("bg-[#123B5D]", "dark:bg-blue-600", "text-white");
                b.classList.add("border", "border-gray-200", "bg-white/90", "text-[#64748B]", "dark:border-gray-700", "dark:bg-[#0D1B2A]", "dark:text-gray-300");
            });

            btn.classList.remove("border", "border-gray-200", "bg-white/90", "text-[#64748B]", "dark:border-gray-700", "dark:bg-[#0D1B2A]", "dark:text-gray-300");
            btn.classList.add("bg-[#123B5D]", "dark:bg-blue-600", "text-white");

            sessionCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                card.style.display = (filterValue === "all" || cardCategory === filterValue) ? "flex" : "none";
            });

            const targetSection = document.getElementById("sessions-calendar") || cardsContainer;
            if (targetSection) {
                const navbarOffset = 96;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        };
    });
}

function initBlogFilters() {
    const filterButtons = document.querySelectorAll("#blogFilterGroup button, #blogFilterGroup a");
    const blogCards = document.querySelectorAll("#blogCardsList .blog-item");
    const blogContainer = document.getElementById("blogCardsList");

    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const filterValue = btn.getAttribute("data-filter") || "all";

            // Update URL hash path
            if (window.history && window.history.pushState) {
                window.history.pushState(null, null, "#blog-library");
            } else {
                window.location.hash = "blog-library";
            }

            // Update active pill styling
            filterButtons.forEach(b => {
                b.classList.remove("active-filter-btn", "bg-[#123B5D]", "dark:bg-blue-600", "text-white", "font-bold", "shadow-md");
                b.classList.add("border", "border-gray-200", "bg-white/90", "text-[#64748B]", "font-semibold", "dark:border-gray-700", "dark:bg-[#0D1B2A]", "dark:text-gray-300");
            });

            btn.classList.remove("border", "border-gray-200", "bg-white/90", "text-[#64748B]", "font-semibold", "dark:border-gray-700", "dark:bg-[#0D1B2A]", "dark:text-gray-300");
            btn.classList.add("active-filter-btn", "bg-[#123B5D]", "dark:bg-blue-600", "text-white", "font-bold", "shadow-md");

            // Filter cards
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                const matches = (filterValue === "all" || cardCategory === filterValue);
                card.style.display = matches ? "flex" : "none";
                if (matches && filterValue !== "all") {
                    card.classList.add("ring-2", "ring-blue-500", "dark:ring-blue-400", "shadow-xl");
                    setTimeout(() => {
                        card.classList.remove("ring-2", "ring-blue-500", "dark:ring-blue-400", "shadow-xl");
                    }, 1500);
                }
            });

            // Smooth scroll so the library section fits cleanly inside viewport
            const targetSection = document.getElementById("blog-library") || blogContainer;
            if (targetSection) {
                const header = document.querySelector("header");
                const navbarOffset = (header ? header.offsetHeight : 72) + 12;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        };
    });
}

function initServicesFilters() {
    const filterButtons = document.querySelectorAll("#servicesFilterGroup .service-filter-btn");
    if (!filterButtons.length) return;

    function setActiveButton(activeBtn) {
        if (!activeBtn) return;
        filterButtons.forEach(btn => {
            btn.classList.remove("active-service-btn", "bg-[#123B5D]", "dark:bg-blue-600", "text-white", "font-bold", "shadow-md");
            btn.classList.add("border", "border-gray-200", "bg-white/90", "text-[#64748B]", "font-semibold", "dark:border-gray-700", "dark:bg-[#0D1B2A]", "dark:text-gray-300");
        });
        activeBtn.classList.remove("border", "border-gray-200", "bg-white/90", "text-[#64748B]", "font-semibold", "dark:border-gray-700", "dark:bg-[#0D1B2A]", "dark:text-gray-300");
        activeBtn.classList.add("active-service-btn", "bg-[#123B5D]", "dark:bg-blue-600", "text-white", "font-bold", "shadow-md");
    }

    // Support initial URL hash on load
    const currentHash = window.location.hash.replace("#", "");
    if (currentHash) {
        const matchingBtn = Array.from(filterButtons).find(b =>
            (b.getAttribute("data-target") === currentHash) || (b.getAttribute("href") === "#" + currentHash)
        );
        if (matchingBtn) {
            setActiveButton(matchingBtn);
        }
    }

    filterButtons.forEach(btn => {
        const targetId = btn.getAttribute("data-target") || btn.getAttribute("href")?.replace("#", "");

        // Instant visual feedback on pointerdown (touch/click start) in 0ms flat
        btn.addEventListener("pointerdown", () => {
            setActiveButton(btn);
        }, { passive: true });

        btn.addEventListener("click", (e) => {
            e.preventDefault();
            setActiveButton(btn);

            if (window.history && window.history.pushState) {
                window.history.pushState(null, null, "#" + targetId);
            } else {
                window.location.hash = targetId;
            }

            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const header = document.querySelector("header");
                const navOffset = (header ? header.offsetHeight : 72) + 16;

                const isRow1 = (targetId === "direct-tax" || targetId === "gst-desk" || targetId === "cross-border");
                const scrollAnchor = isRow1 ? (document.getElementById("services-overview") || targetEl) : targetEl;

                const elementPosition = scrollAnchor.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Prominent visual highlight on the specific card clicked
                const card = targetEl.classList.contains("group") ? targetEl : targetEl.querySelector(".group");
                if (card) {
                    card.classList.add("ring-4", "ring-[#123B5D]", "dark:ring-blue-400", "shadow-2xl", "scale-[1.01]");
                    setTimeout(() => {
                        card.classList.remove("ring-4", "ring-[#123B5D]", "dark:ring-blue-400", "shadow-2xl", "scale-[1.01]");
                    }, 1800);
                }
            }
        });
    });
}

function initFaqFilters() {
    const filterButtons = document.querySelectorAll("#faqFilterGroup button, #faqFilterGroup a");
    const faqSections = document.querySelectorAll(".faq-category-section");

    if (!filterButtons.length) return;

    filterButtons.forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const filterValue = btn.getAttribute("data-filter") || btn.getAttribute("href")?.replace("#", "") || "all";

            filterButtons.forEach(b => {
                b.classList.remove("bg-[#123B5D]", "dark:bg-blue-600", "text-white", "font-bold", "shadow-md");
                b.classList.add(
                    "border", "border-gray-200", "bg-white/90", "text-[#64748B]", "font-semibold",
                    "dark:border-gray-700", "dark:bg-[#0D1B2A]", "dark:text-gray-300"
                );
            });

            btn.classList.remove("border", "border-gray-200", "bg-white/90", "text-[#64748B]", "font-semibold", "dark:border-gray-700", "dark:bg-[#0D1B2A]", "dark:text-gray-300");
            btn.classList.add("bg-[#123B5D]", "dark:bg-blue-600", "text-white", "font-bold", "shadow-md");

            faqSections.forEach(section => {
                const sectionId = section.getAttribute("id");
                const sectionCategory = section.getAttribute("data-category") || sectionId;
                const matches = filterValue === "all" || sectionId === filterValue || sectionCategory === filterValue;
                section.style.display = matches ? "block" : "none";
            });

            const targetSection = filterValue === "all" ? faqSections[0] : document.getElementById(filterValue);
            if (targetSection) {
                const navbarOffset = 96;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        };
    });
}

function initFaqAccordion() {
    const toggles = document.querySelectorAll(".faq-toggle");
    if (!toggles.length) return;

    toggles.forEach(toggle => {
        toggle.onclick = (e) => {
            e.preventDefault();
            const container = toggle.closest(".faq-item") || toggle.parentElement;
            const content = toggle.nextElementSibling || (container ? container.querySelector(".faq-content") : null);
            const icon = toggle.querySelector(".faq-icon");
            if (!content) return;

            const isClosed = content.classList.contains("hidden");

            // Close all FAQ items
            document.querySelectorAll(".faq-content").forEach(c => c.classList.add("hidden"));
            document.querySelectorAll(".faq-icon").forEach(i => i.textContent = "+");
            document.querySelectorAll(".faq-toggle").forEach(t => t.setAttribute("aria-expanded", "false"));
            document.querySelectorAll(".faq-item").forEach(item => {
                item.classList.remove("border-[#123B5D]", "shadow-md", "dark:border-blue-500");
                item.classList.add("border-gray-200", "dark:border-gray-800");
            });

            // If it was closed, open this one
            if (isClosed) {
                content.classList.remove("hidden");
                if (icon) icon.textContent = "−";
                toggle.setAttribute("aria-expanded", "true");
                if (container) {
                    container.classList.remove("border-gray-200", "dark:border-gray-800");
                    container.classList.add("border-[#123B5D]", "shadow-md", "dark:border-blue-500");
                }
            }
        };
    });
}

function initHome2SlotButtons() {
    const slotBtns = document.querySelectorAll("section button");
    slotBtns.forEach(btn => {
        if (btn.textContent.includes("AM") || btn.textContent.includes("PM")) {
            btn.onclick = () => {
                slotBtns.forEach(b => {
                    if (b.textContent.includes("AM") || b.textContent.includes("PM")) {
                        b.classList.remove("border-emerald-400", "bg-emerald-500/20", "text-emerald-300");
                        b.classList.add("border-white/20", "bg-white/10", "text-white");
                    }
                });
                btn.classList.remove("border-white/20", "bg-white/10");
                btn.classList.add("border-emerald-400", "bg-emerald-500/20", "text-emerald-300");
            };
        }
    });
}

function initPasswordToggles() {
    const toggleButtons = document.querySelectorAll(".password-toggle-btn");

    toggleButtons.forEach(btn => {
        btn.onclick = () => {
            const targetInputId = btn.getAttribute("data-target");
            const input = document.getElementById(targetInputId);
            if (!input) return;

            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";

            const eyeIcon = btn.querySelector("svg");
            if (eyeIcon) {
                eyeIcon.innerHTML = isPassword
                    ? `<path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />`
                    : `<path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />`;
            }
        };
    });
}

function initLoginForm() {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.onsubmit = (e) => {
        e.preventDefault();

        const submitBtn = loginForm.querySelector("button[type='submit']");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="inline-flex items-center gap-2">
                    <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Verifying Credentials...
                </span>
            `;
        }

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 800);
    };
}

function initRegisterForm() {
    const registerForm = document.getElementById("registerForm");
    if (!registerForm) return;

    registerForm.onsubmit = (e) => {
        e.preventDefault();

        const pass = document.getElementById("regPassword");
        const confirmPass = document.getElementById("regConfirmPassword");
        const errorMsg = document.getElementById("registerErrorMsg");

        if (pass && confirmPass && pass.value !== confirmPass.value) {
            if (errorMsg) {
                errorMsg.textContent = "Passwords do not match. Please re-enter.";
                errorMsg.classList.remove("hidden");
            } else {
                alert("Passwords do not match!");
            }
            confirmPass.focus();
            return;
        }

        const submitBtn = registerForm.querySelector("button[type='submit']");
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `
                <span class="inline-flex items-center gap-2">
                    <svg class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                    Creating Vault Account...
                </span>
            `;
        }

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 900);
    };
}

function initInteractions() {
    const html = document.documentElement;
    const themeToggleBtns = document.querySelectorAll(".themeToggleBtn");
    const directionToggleBtns = document.querySelectorAll(".directionToggleBtn");

    // Initial load sync
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && systemPrefersDark);
    window.applyTheme(isDark);

    // Event listener attach
    themeToggleBtns.forEach(btn => {
        btn.onclick = () => window.toggleDarkMode();
    });

    // Direction logic
    const savedDir = localStorage.getItem("taxora_direction") || "ltr";
    html.setAttribute("dir", savedDir);
    directionToggleBtns.forEach(b => b.textContent = savedDir.toUpperCase());

    directionToggleBtns.forEach(btn => {
        btn.onclick = () => window.toggleDirection();
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileMenuBtn && mobileMenu) {
        const hamburgerIcon = document.getElementById("hamburgerIcon");
        const closeIcon = document.getElementById("closeIcon");

        const setMenuState = (isOpen) => {
            if (isOpen) {
                mobileMenu.classList.remove("hidden");
                mobileMenuBtn.setAttribute("aria-expanded", "true");
                if (hamburgerIcon && closeIcon) {
                    hamburgerIcon.classList.add("hidden");
                    closeIcon.classList.remove("hidden");
                } else {
                    mobileMenuBtn.textContent = "✕";
                }
            } else {
                mobileMenu.classList.add("hidden");
                mobileMenuBtn.setAttribute("aria-expanded", "false");
                if (hamburgerIcon && closeIcon) {
                    hamburgerIcon.classList.remove("hidden");
                    closeIcon.classList.add("hidden");
                } else {
                    mobileMenuBtn.textContent = "☰";
                }
            }
        };

        mobileMenuBtn.onclick = (e) => {
            e.stopPropagation();
            const isCurrentlyOpen = !mobileMenu.classList.contains("hidden");
            setMenuState(!isCurrentlyOpen);
        };

        document.addEventListener("click", (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                setMenuState(false);
            }
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                setMenuState(false);
            });
        });

        mobileMenu.addEventListener("click", (e) => {
            e.stopPropagation();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                setMenuState(false);
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth >= 1280 && !mobileMenu.classList.contains("hidden")) {
                setMenuState(false);
            }
        });
    }
}

function updateActiveNav() {
    let rawPath = window.location.pathname || "";
    let currentFile = rawPath.split("/").filter(Boolean).pop() || "index.html";
    if (currentFile.includes("?")) currentFile = currentFile.split("?")[0];
    if (currentFile.includes("#")) currentFile = currentFile.split("#")[0];

    let currentPage = currentFile.toLowerCase();
    if (currentPage.endsWith(".html")) {
        currentPage = currentPage.replace(".html", "");
    }
    if (!currentPage || currentPage === "index" || currentPage === "navbar") {
        currentPage = "index";
    }

    const dropdownButtons = document.querySelectorAll("header nav .group > button");
    dropdownButtons.forEach(btn => {
        btn.classList.remove(
            "nav-active", "bg-[#123B5D]", "text-white", "!text-white", "font-bold", "font-semibold",
            "dark:bg-blue-600", "dark:text-white", "dark:!text-white", "shadow-sm",
            "bg-[#EAF2F7]", "text-[#123B5D]", "dark:bg-[#162B3D]"
        );
        btn.classList.add("text-[#334155]", "dark:text-gray-300");
        btn.removeAttribute("aria-current");
    });

    const allLinks = document.querySelectorAll("header nav a, #mobileMenu a");
    allLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href || href === "login.html" || href.startsWith("#") || href.startsWith("http")) return;

        link.classList.remove(
            "nav-active", "bg-[#123B5D]", "text-white", "!text-white", "font-bold", "font-semibold",
            "dark:bg-blue-600", "dark:text-white", "dark:!text-white", "shadow-sm",
            "bg-[#EAF2F7]", "text-[#123B5D]", "text-[#1D4ED8]",
            "dark:bg-[#162B3D]", "dark:text-[#60A5FA]"
        );
        link.classList.add("text-[#334155]", "dark:text-gray-300");
        link.removeAttribute("aria-current");

        let linkPage = href.split("/").filter(Boolean).pop() || "";
        if (linkPage.includes("?")) linkPage = linkPage.split("?")[0];
        if (linkPage.includes("#")) linkPage = linkPage.split("#")[0];
        if (linkPage.endsWith(".html")) {
            linkPage = linkPage.replace(".html", "");
        }
        linkPage = linkPage.toLowerCase();

        if (linkPage === currentPage) {
            const parentDropdown = link.closest(".group");
            const isInsideMobileMenu = link.closest("#mobileMenu");

            if (parentDropdown) {
                // Inside dropdown
                link.classList.remove("text-[#334155]", "dark:text-gray-300");
                link.classList.add(
                    "nav-active", "bg-[#123B5D]", "!text-white", "font-semibold",
                    "dark:bg-blue-600", "dark:!text-white"
                );
                link.setAttribute("aria-current", "page");

                const parentButton = parentDropdown.querySelector("button");
                if (parentButton) {
                    parentButton.classList.remove("text-[#334155]", "dark:text-gray-300");
                    parentButton.classList.add(
                        "nav-active", "bg-[#123B5D]", "!text-white", "font-semibold", "shadow-sm",
                        "dark:bg-blue-600", "dark:!text-white"
                    );
                    parentButton.setAttribute("aria-current", "page");
                }
            } else if (isInsideMobileMenu) {
                // Mobile menu item
                link.classList.remove("text-[#334155]", "dark:text-gray-300");
                link.classList.add(
                    "nav-active", "bg-[#123B5D]", "!text-white", "font-semibold", "shadow-sm",
                    "dark:bg-blue-600", "dark:!text-white"
                );
                link.setAttribute("aria-current", "page");
            } else {
                // Top-level desktop nav link
                link.classList.remove("text-[#334155]", "dark:text-gray-300");
                link.classList.add(
                    "nav-active", "bg-[#123B5D]", "!text-white", "font-semibold", "shadow-sm",
                    "dark:bg-blue-600", "dark:!text-white"
                );
                link.setAttribute("aria-current", "page");
            }
        }
    });
}