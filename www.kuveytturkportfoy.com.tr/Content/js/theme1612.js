document.addEventListener('DOMContentLoaded', function () {
    // Global Variables
    const lang = document.documentElement.lang;

    //
    // Search
    //
    const $searchInput = $("#modal-search .uk-search-input");
    const $suggested = $("#modal-search .suggested");
    const $searchList = $("#modal-search .search-list");
    const $searchIcon = $("#modal-search .uk-search-icon");

    const ITEMS_PER_PAGE = 5;
    let searchTimeout;
    let allResults = [];
    let isExpanded = false;

    $searchList.hide();

    $searchInput.on("input", function () {
        const value = $(this).val().trim();

        isExpanded = false;

        clearTimeout(searchTimeout);

        if (value) {
            $suggested.hide();
            $searchIcon.attr("uk-icon", "icon: icn-close");
            $searchIcon.addClass("uk-text-muted");

            searchTimeout = setTimeout(() => {
                fetchSearchResults(value);
            }, 300);
        } else {
            $suggested.show();
            $searchList.hide();
            $searchIcon.attr("uk-icon", "icon: icn-search");
            $searchIcon.removeClass("uk-text-muted");
        }
    });

    $searchIcon.on("click", function () {
        const isCloseIcon = $searchIcon.attr("uk-icon").includes("icn-close");
        if (isCloseIcon) {
            $searchInput.val("");
            $suggested.show();
            $searchList.hide();
            $searchIcon.attr("uk-icon", "icon: icn-search");
            $searchIcon.removeClass("uk-text-muted");
        }
    });

    function fetchSearchResults(query) {
        const culture = lang;
        const apiUrl = `/umbraco/api/search/SearchContent?query=${encodeURIComponent(
            query
        )}&culture=${culture}`;

        $.ajax({
            url: apiUrl,
            method: "GET",
            success: function (data) {
                allResults = data;
                displaySearchResults();
            },
            error: function (xhr, status, error) {
                console.error("Search API Error:", error);
                $searchList.html(
                    '<p class="uk-text-danger">Arama sırasında bir hata oluştu.</p>'
                );
                $searchList.show();
            },
        });
    }

    function displaySearchResults() {
        if (!Array.isArray(allResults) || allResults.length === 0) {
            $searchList.html('<p class="uk-text-muted">Sonuç bulunamadı.</p>');
            $searchList.show();
            return;
        }

        const resultsToShow = isExpanded
            ? allResults
            : allResults.slice(0, ITEMS_PER_PAGE);

        const html = `
            <ul class="uk-list uk-list-divider uk-list-large uk-text-emphasis">
                ${resultsToShow
                    .map(
                        (item) => `
                    <li>
                        <a href="${item.url}" class="uk-link-reset">
                            ${item.name}
                        </a>
                    </li>
                `
                    )
                    .join("")}
            </ul>
            ${
                allResults.length > ITEMS_PER_PAGE
                    ? `
                <div class="uk-margin-40-top">
                    <button class="uk-button uk-button-link uk-text-primary toggle-results-btn">
                        ${isExpanded ? "Daha Az Göster" : "Daha Fazla Sonuç Göster"}
                        <span uk-icon="icon: icn-chevron-down-large" style="transform: ${
                            isExpanded ? "rotate(180deg)" : "none"
                        }; transition: transform 0.2s;"></span>
                    </button>
                </div>
            `
                    : ""
            }
        `;

        $searchList.html(html);
        $searchList.show();

        $(".toggle-results-btn").on("click", function () {
            isExpanded = !isExpanded;
            displaySearchResults();
        });
    }

    //
    // Slider Filter
    //

    const slider = document.querySelector("#slider-container");
    const filterContainer = document.querySelector("#filter-container");
    const tabs = document.querySelectorAll("#tab-container li");

    if (slider) {
        const sliderComponent = UIkit.slider(slider);
        const filterComponent = UIkit.filter(filterContainer);

        function reinitializeSlider() {
            const visibleItems = slider.querySelectorAll(
                '.uk-slider-items > [style*="display: block"], .uk-slider-items > :not([style*="display: none"])'
            );

            const navigation = slider.querySelectorAll(".uk-slidenav");

            navigation.forEach((nav) => {
                nav.style.display = visibleItems.length <= 4 ? "none" : "block";
            });

            UIkit.slider(slider, {
                finite: true,
            });

            const newSliderComponent = UIkit.slider(slider);

            if (newSliderComponent) {
                newSliderComponent.show(0);
            }
        }

        filterContainer.addEventListener("beforeFilter", () => {
            if (sliderComponent) {
                sliderComponent.show(0);
            }
        });

        filterContainer.addEventListener("afterFilter", () => {
            reinitializeSlider();
        });

        tabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                reinitializeSlider();
            });
        });

        reinitializeSlider();
    }

    //
    // Home Announcements
    //

    $('select[aria-label="Kategori"]').on("change", function () {
        var selectedCategory = $(this).val();
        if (selectedCategory === "") {
            $("[data-category]").show();
        } else {
            $("[data-category]").each(function () {
                if ($(this).data("category") === selectedCategory) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });

    //
    // Fund Calculator
    //

    // Mask
    $(".money").mask("000.000.000", { reverse: true });

    //Flatpickr
    flatpickr(".flatpicker", {
        locale: lang,
        disableMobile: true,
        dateFormat: "m.d.Y",
        altInput: true,
        altFormat: "d M, Y",
        maxDate: "today",
    });

    // Fund calculator inputs may be absent on some pages; guard before reading .value
    var startDateInput = document.querySelector("#fundCalculate #startDate");
    var endDateInput = document.querySelector("#fundCalculate #endDate");

    var startDateConfig = {
        locale: lang,
        disableMobile: true,
        dateFormat: "m.d.Y",
        altInput: true,
        altFormat: "d M, Y",
        maxDate: "today",
        onChange: function () {
            $('#fundCalculate input[name="time"]').prop("checked", false);
        },
    };

    var endDateConfig = {
        locale: lang,
        disableMobile: true,
        dateFormat: "m.d.Y",
        altInput: true,
        altFormat: "d M, Y",
        maxDate: "today",
        onChange: function () {
            $('#fundCalculate input[name="time"]').prop("checked", false);
        },
    };

    if (startDateInput && !startDateInput.value) {
        startDateConfig.defaultDate = new Date().fp_incr(-365);
    }

    if (endDateInput && !endDateInput.value) {
        endDateConfig.defaultDate = "today";
    }

    var startDatePicker = null;
    var endDatePicker = null;
    if (startDateInput) {
        startDatePicker = flatpickr("#fundCalculate #startDate", startDateConfig);
    }
    if (endDateInput) {
        endDatePicker = flatpickr("#fundCalculate #endDate", endDateConfig);
    }

    function updateDisplay(response) {
        if (!response || !response.data) return;

        const data = response.data;
        const money = $(".fund-calculator #money").val().replace(/\./g, "");

        $(".fund-calculator #fundCode").text($(".fund-calculator #fund").val());
        $(".fund-calculator #fundName").text(data.fundName);
        $(".fund-calculator #investment").text(
            money.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        );
        $(".fund-calculator #term").text(data.term.split(".")[0]);
        $(".fund-calculator #netProfit").text(
            data.netProfit.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
        );
        $(".fund-calculator #grossProfit").text(
            data.grossProfit.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
        );
        $(".fund-calculator #netProfitPercentage").text(
            data.netProfitPercentage.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
        );
        $(".fund-calculator #grossProfitPercentage").text(
            data.grossProfitPercentage.toLocaleString("tr-TR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })
        );

        $(".fund-calculator #risk").text(data.risk);

        let riskLevelText = "";
        if (data.risk <= 2) {
            if (lang === "tr") {
                riskLevelText = "(Düşük Riskli)";
            } else {
                riskLevelText = "(Low Risk)";
            }
        } else if (data.risk >= 3 && data.risk <= 5) {
            if (lang === "tr") {
                riskLevelText = "(Orta Riskli)";
            } else {
                riskLevelText = "(Medium Risk)";
            }
        } else if (data.risk >= 6) {
            if (lang === "tr") {
                riskLevelText = "(Yüksek Riskli)";
            } else {
                riskLevelText = "(High Risk)";
            }
        }
        $(".fund-calculator #riskLevel").text(riskLevelText);

        const risk = parseInt(data.risk);
        const riskColor = getRiskColor(risk);
        const $riskLevel = $(".fund-calculator .uk-risk-level");

        $riskLevel.find("span").removeClass("uk-active");

        $riskLevel.find("span").each(function (index) {
            if (index < risk) {
                $(this).addClass("uk-active");
            }
        });

        $riskLevel.closest(".uk-flex").css("--color", riskColor);
        $(".fund-calculator #risk").css("color", riskColor);

        if (data.riskDoviz !== undefined && data.riskDoviz > 0) {
            $("#riskOtherContainer").removeClass("uk-hidden");

            $(".fund-calculator #riskOther").text(data.riskDoviz);

            let riskLevelOtherText = "";
            if (data.riskDoviz <= 2) {
                if (lang === "tr") {
                    riskLevelOtherText = "(Düşük Riskli)";
                } else {
                    riskLevelOtherText = "(Low Risk)";
                }
            } else if (data.riskDoviz >= 3 && data.riskDoviz <= 5) {
                if (lang === "tr") {
                    riskLevelOtherText = "(Orta Riskli)";
                } else {
                    riskLevelOtherText = "(Medium Risk)";
                }
            } else if (data.riskDoviz >= 6) {
                if (lang === "tr") {
                    riskLevelOtherText = "(Yüksek Riskli)";
                } else {
                    riskLevelOtherText = "(High Risk)";
                }
            }
            $(".fund-calculator #riskLevelOther").text(riskLevelOtherText);

            const riskDovizValue = parseInt(data.riskDoviz);
            const riskDovizColor = getRiskColor(riskDovizValue);
            const $riskOtherLevel = $(
                ".fund-calculator #riskOtherContainer .uk-risk-level"
            );
            
            $riskOtherLevel.find("span").removeClass("uk-active");

            $riskOtherLevel.find("span").each(function (index) {
                if (index < riskDovizValue) {
                    $(this).addClass("uk-active");
                }
            });

            $riskOtherLevel.closest(".uk-flex").css("--color", riskDovizColor);
            $(".fund-calculator #riskOther").css("color", riskDovizColor);
        } else {
            $("#riskOtherContainer").addClass("uk-hidden");
        }
    }

    function getRiskColor(risk) {
        switch (parseInt(risk)) {
            case 1:
                return "#4CD236";
            case 2:
                return "#F9CA4F";
            case 3:
                return "#F9CA4F";
            case 4:
                return "#F9CA4F";
            case 5:
                return "#FFA84A";
            case 6:
                return "#EE5C2E";
            case 7:
                return "#EE5C2E";
            default:
                return "#4CD236";
        }
    }

    function calculateProfit() {
        var fund = $(".fund-calculator #fund").val();
        var money = $(".fund-calculator #money").val().replace(/\./g, "");
        var currency = $(".fund-calculator #currency").val();
        var startDate = $(".fund-calculator #startDate").val();
        var endDate = $(".fund-calculator #endDate").val();

        var dataCurrency = $(".fund-calculator #fund option:selected").attr(
            "data-currency"
        );

        updateCurrencyOptions(dataCurrency);

        var data = JSON.stringify({
            fund: fund,
            investment: parseInt(money),
            doviz: currency,
            start: startDate,
            end: endDate,
            culture: lang
        });

        $.ajax({
            url: "/umbraco/api/Fon/ProfitCalculator",
            type: "POST",
            contentType: "application/json",
            data: data,
            success: function (response) {
                updateDisplay(response);
            },
            error: function (xhr, status, error) {
                console.error("Status:", status);
                console.error("Error:", error);
                console.error("Response:", xhr.responseText);
            },
        });
    }
    
    var urlCurrency = getUrlParameter("currency");
    var currencyInitialized = false;

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
        var results = regex.exec(location.search);
        return results === null
            ? ""
            : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

    function updateCurrencySymbols(selectedCurrency) {
        $(".currencySymbol").text(selectedCurrency);
    }

    function updateCurrencyOptions(dataCurrency) {
        if (!dataCurrency) return;

        var currencies = dataCurrency.split(",");
        var $currencySelect = $(".fund-calculator #currency");
        var selectedCurrency = $currencySelect.val();
        
        $currencySelect.empty();

        $.each(currencies, function (index, currency) {
            currency = currency.trim();
            $currencySelect.append(
                $("<option></option>").val(currency).text(currency)
            );
        });

        if (
            !currencyInitialized &&
            urlCurrency &&
            currencies.includes(urlCurrency)
        ) {
            $currencySelect.val(urlCurrency);
            currencyInitialized = true;
        }
        else if (currencies.includes(selectedCurrency)) {
            $currencySelect.val(selectedCurrency);
        }

        updateCurrencySymbols($currencySelect.val());
    }

    $(".fund-calculator #fund").on("change", function () {
        var dataCurrency = $(this)
            .find("option:selected")
            .attr("data-currency");
        updateCurrencyOptions(dataCurrency);
    });

    var initialDataCurrency = $(".fund-calculator #fund option:selected").attr(
        "data-currency"
    );
    updateCurrencyOptions(initialDataCurrency);

    calculateProfit();

    $("#fundCalculate").submit(function (e) {
        var selectedCurrency = $(".fund-calculator #currency").val();
        updateCurrencySymbols(selectedCurrency);

        const href = $(this).find('button[type="submit"]').data("href");

        if (href) {
            e.preventDefault();
            const fund = $(".fund-calculator #fund").val();
            const investment = $(".fund-calculator #money").val();
            const currency = $(".fund-calculator #currency").val();
            const startDate = $(".fund-calculator #startDate").val();
            const endDate = $(".fund-calculator #endDate").val();

            window.location.href = `${href}?fund=${fund}&investment=${investment}&currency=${currency}&startDate=${startDate}&endDate=${endDate}`;
        } else {
            e.preventDefault();
            calculateProfit();
        }
    });

    $(".fund-calculator .uk-subnav-pill li").on("click", function () {
        const category = $(this).data("cat");

        if (category === "kurumsal") {
            $(
                ".fund-calculator #netProfitContainer, .fund-calculator #netProfitPercentageContainer"
            ).addClass("uk-hidden");
        } else {
            $(
                ".fund-calculator #netProfitContainer, .fund-calculator #netProfitPercentageContainer"
            ).removeClass("uk-hidden");
        }
    });

    $('#fundCalculate input[name="time"]').change(function () {
        const value = $(this).val();
        let endDate = new Date();
        let startDate = new Date();

        switch (value) {
            case "1":
                startDate.setDate(endDate.getDate() - 7);
                break;
            case "2":
                startDate.setDate(endDate.getDate() - 30);
                break;
            case "3":
                startDate.setDate(endDate.getDate() - 90);
                break;
            case "4":
                startDate.setDate(endDate.getDate() - 180);
                break;
            case "5":
                startDate.setDate(endDate.getDate() - 365);
                break;
        }

    if (startDatePicker) startDatePicker.setDate(startDate);
    if (endDatePicker) endDatePicker.setDate("today");

        // Only run calculator logic if form exists
        if (document.querySelector('#fundCalculate')) {
            calculateProfit();
        }
    });

    //
    // Count Up Animation
    //

    function initCountUp() {
        if ($(".section-count").length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const countElements =
                            entry.target.querySelectorAll("[data-count]");

                        countElements.forEach((element) => {
                            
                            const targetNumber = parseFloat(
                                element.getAttribute("data-count")
                            );
                            let currentNumber = 0;
                            const duration = 2000;
                            const startTime = performance.now();

                            function updateCount(currentTime) {
                                const elapsedTime = currentTime - startTime;

                                const progress = Math.min(
                                    elapsedTime / duration,
                                    1
                                );

                                currentNumber =
                                    progress * (2 - progress) * targetNumber;

                                let formattedNumber;
                                if (Number.isInteger(targetNumber)) {
                                    formattedNumber =
                                        Math.floor(
                                            currentNumber
                                        ).toLocaleString();
                                } else {
                                    formattedNumber = currentNumber
                                        .toFixed(1)
                                        .toLocaleString();
                                }

                                element.textContent = formattedNumber;

                                if (progress < 1) {
                                    requestAnimationFrame(updateCount);
                                }
                            }

                            requestAnimationFrame(updateCount);
                        });

                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
            }
        );

        observer.observe(document.querySelector(".section-count"));
    }

    initCountUp();

    $(window).on("load", function () {
        initCountUp();
    });
});
