
(function () {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }

    const savedDir = localStorage.getItem("taxora_direction") || "ltr";
    document.documentElement.setAttribute("dir", savedDir);

    const zeroFlashStyle = document.createElement("style");
    zeroFlashStyle.id = "taxora-zero-flash-styles";
    zeroFlashStyle.innerHTML = `
        * {
            -webkit-tap-highlight-color: transparent !important;
        }
        .dark .active-filter, 
        .dark .active-toggle {
            background-color: #2563eb !important;
            color: #ffffff !important;
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

window.toggleDarkMode = function () {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");
    if (isDark) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
    } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
    const knobs = document.querySelectorAll(".themeKnob");
    knobs.forEach(knob => {
        knob.style.transform = isDark ? "translateX(0px)" : "translateX(42px)";
    });
};

window.toggleDirection = function () {
    const html = document.documentElement;
    const currentDir = html.getAttribute("dir") || "ltr";
    const nextDir = currentDir === "rtl" ? "ltr" : "rtl";
    html.setAttribute("dir", nextDir);
    localStorage.setItem("taxora_direction", nextDir);
    const directionToggleBtns = document.querySelectorAll(".directionToggleBtn");
    directionToggleBtns.forEach(btn => btn.textContent = nextDir.toUpperCase());
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


document.addEventListener("DOMContentLoaded", async () => {
    const navContainer = document.getElementById("navbar-placeholder");
    const footerContainer = document.getElementById("footer-placeholder");

    try {
        if (navContainer) {
            const response = await fetch("/navbar.html");

            if (!response.ok) {
                throw new Error("Navbar failed to load");
            }

            navContainer.innerHTML = await response.text();
        }

        if (footerContainer) {
            const response = await fetch("/footer.html");

            if (response.ok) {
                footerContainer.innerHTML = await response.text();
            }
        }
    } catch (error) {
        console.error("Loading error:", error);
    }

    initInteractions();
    initAllPageFeatures();
    updateActiveNav();
});



function initAllPageFeatures() {
    initPricingToggle();
    initSessionFilters();
    initBlogFilters();
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
        btnBiz.classList.remove("bg-[#123B5D]", "dark:bg-blue-600", "text-white");
        btnBiz.classList.add("text-[#64748B]", "dark:text-gray-300");

        btnInd.classList.remove("text-[#64748B]", "dark:text-gray-300");
        btnInd.classList.add("bg-[#123B5D]", "dark:bg-blue-600", "text-white");

        if (bizCards) bizCards.classList.add("hidden");
        if (indCards) indCards.classList.remove("hidden");
    };

    btnBiz.onclick = () => {
        btnInd.classList.remove("bg-[#123B5D]", "dark:bg-blue-600", "text-white");
        btnInd.classList.add("text-[#64748B]", "dark:text-gray-300");

        btnBiz.classList.remove("text-[#64748B]", "dark:text-gray-300");
        btnBiz.classList.add("bg-[#123B5D]", "dark:bg-blue-600", "text-white");

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

            if (cardsContainer) {
                const navbarOffset = 110;
                const elementPosition = cardsContainer.getBoundingClientRect().top;
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
    const filterButtons = document.querySelectorAll("#blogFilterGroup button");
    const blogCards = document.querySelectorAll("#blogCardsList .blog-item");
    const blogContainer = document.getElementById("blogCardsList");

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

            blogCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                card.style.display = (filterValue === "all" || cardCategory === filterValue) ? "flex" : "none";
            });

            if (blogContainer) {
                const navbarOffset = 110;
                const elementPosition = blogContainer.getBoundingClientRect().top;
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
        toggle.onclick = () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector(".faq-icon");
            if (!content) return;

            const isClosed = content.classList.contains("hidden");

            document.querySelectorAll(".faq-content").forEach(c => c.classList.add("hidden"));
            document.querySelectorAll(".faq-icon").forEach(i => i.textContent = "+");

            if (isClosed) {
                content.classList.remove("hidden");
                if (icon) icon.textContent = "−";
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
    const themeKnobs = document.querySelectorAll(".themeKnob");
    const directionToggleBtns = document.querySelectorAll(".directionToggleBtn");

    function applyTheme(isDark) {
        if (isDark) {
            html.classList.add("dark");
            themeKnobs.forEach(knob => knob.style.transform = "translateX(42px)");
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark");
            themeKnobs.forEach(knob => knob.style.transform = "translateX(0px)");
            localStorage.setItem("theme", "light");
        }
    }

    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(savedTheme === "dark" || (!savedTheme && systemPrefersDark));

    themeToggleBtns.forEach(btn => {
        btn.onclick = () => applyTheme(!html.classList.contains("dark"));
    });

    const savedDir = localStorage.getItem("taxora_direction") || "ltr";
    html.setAttribute("dir", savedDir);
    directionToggleBtns.forEach(b => b.textContent = savedDir.toUpperCase());

    directionToggleBtns.forEach(btn => {
        btn.onclick = () => {
            const isRTL = html.getAttribute("dir") === "rtl";
            const newDir = isRTL ? "ltr" : "rtl";
            html.setAttribute("dir", newDir);
            localStorage.setItem("taxora_direction", newDir);
            directionToggleBtns.forEach(b => b.textContent = newDir.toUpperCase());
        };
    });

    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.onclick = (e) => {
            e.stopPropagation();
            const isClosed = mobileMenu.classList.contains("hidden");
            mobileMenu.classList.toggle("hidden", !isClosed);
            mobileMenuBtn.textContent = isClosed ? "✕" : "☰";
        };

        document.onclick = (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.add("hidden");
                mobileMenuBtn.textContent = "☰";
            }
        };

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.onclick = () => {
                mobileMenu.classList.add("hidden");
                mobileMenuBtn.textContent = "☰";
            };
        });
    }
}

function updateActiveNav() {
    const pathSegments = window.location.pathname.split("/").filter(Boolean);
    const lastSegment = pathSegments.pop() || "index.html";
    const currentPage = (lastSegment.includes(".") ? lastSegment.split(".")[0] : lastSegment).toLowerCase() || "index";

    const dropdownButtons = document.querySelectorAll("header nav .group > button");
    dropdownButtons.forEach(btn => {
        btn.classList.remove("bg-[#EAF2F7]", "text-[#123B5D]", "font-bold", "dark:bg-[#162B3D]", "dark:text-white", "shadow-sm");
        btn.classList.add("text-[#334155]", "dark:text-gray-300");
    });

    const allLinks = document.querySelectorAll("header nav a, #mobileMenu a");
    allLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (!href || href === "login.html" || href.startsWith("#") || href.startsWith("http")) return;

        link.classList.remove(
            "bg-[#EAF2F7]", "text-[#123B5D]", "text-[#1D4ED8]", "font-bold",
            "dark:bg-[#162B3D]", "dark:text-white", "dark:text-[#60A5FA]", "shadow-sm"
        );
        link.classList.add("text-[#334155]", "dark:text-gray-300");

        const linkFile = href.split("/").filter(Boolean).pop() || "";
        const linkPage = (linkFile.includes(".") ? linkFile.split(".")[0] : linkFile).toLowerCase();

        if (linkPage === currentPage) {
            const parentDropdown = link.closest(".group");
            const isInsideMobileMenu = link.closest("#mobileMenu");

            if (parentDropdown) {
                link.classList.remove("text-[#334155]", "dark:text-gray-300");
                link.classList.add("text-[#1D4ED8]", "font-bold", "dark:text-[#60A5FA]");

                const parentButton = parentDropdown.querySelector("button");
                if (parentButton) {
                    parentButton.classList.remove("text-[#334155]", "dark:text-gray-300");
                    parentButton.classList.add("bg-[#EAF2F7]", "text-[#123B5D]", "font-bold", "dark:bg-[#162B3D]", "dark:text-white", "shadow-sm");
                }
            } else if (isInsideMobileMenu) {
                link.classList.remove("text-[#334155]", "dark:text-gray-300");
                link.classList.add("text-[#1D4ED8]", "font-bold", "dark:text-[#60A5FA]");
            } else {
                link.classList.remove("text-[#334155]", "dark:text-gray-300");
                link.classList.add("bg-[#EAF2F7]", "text-[#123B5D]", "font-bold", "dark:bg-[#162B3D]", "dark:text-white", "shadow-sm");
            }
        }
    });
}