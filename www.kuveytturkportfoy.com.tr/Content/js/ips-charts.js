/**
 * IPS Chart Konfigürasyonları
 * Radar chart, bar chart, gauge chart ve doughnut chart
 * 
 * Kuveyt Türk Portföy - Investment Policy Statement (IPS) Modülü
 * Chart.js 3.x uyumlu
 */

const IPSCharts = {
    // Renk paleti
    colors: {
        primary: '#00a651',      // Kuveyt Türk yeşili
        secondary: '#2c3e50',    // Koyu mavi
        warning: '#f39c12',      // Sarı
        danger: '#e74c3c',       // Kırmızı
        success: '#27ae60',      // Açık yeşil
        info: '#3498db',         // Mavi
        light: '#ecf0f1',        // Açık gri
        dark: '#2c3e50',         // Koyu
        gold: '#f1c40f',         // Altın
        purple: '#9b59b6'        // Mor
    },

    // Risk renkleri
    riskColors: {
        low: '#27ae60',
        medium: '#f39c12',
        high: '#e74c3c'
    },

    /**
     * Risk Radar Chart - Spider grafiği
     * Risk kapasitesi ve istekliliği boyutlarını gösterir
     */
    createRiskRadarChart: function(ctx, scores) {
        const labels = [
            'Yaş Faktörü',
            'Gelir Kapasitesi',
            'Varlık Düzeyi',
            'Deneyim',
            'Risk Toleransı',
            'Likidite İhtiyacı'
        ];

        // Normalize scores to 0-100
        const normalizedScores = scores.map(s => Math.min(100, Math.max(0, s)));

        return new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Risk Profili',
                    data: normalizedScores,
                    fill: true,
                    backgroundColor: 'rgba(0, 166, 81, 0.2)',
                    borderColor: this.colors.primary,
                    pointBackgroundColor: this.colors.primary,
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: this.colors.primary,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Risk Boyutları Analizi',
                        font: { size: 16, weight: 'bold' },
                        color: this.colors.dark
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(0,0,0,0.1)' },
                        grid: { color: 'rgba(0,0,0,0.1)' },
                        pointLabels: { 
                            font: { size: 11 },
                            color: this.colors.dark
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 25,
                            callback: function(value) { return value + '%'; }
                        }
                    }
                }
            }
        });
    },

    /**
     * Puan Dağılımı Bar Chart
     * Her sorunun puan yüzdesini gösterir
     */
    createScoreBarChart: function(ctx, questionScores) {
        const labels = questionScores.map(q => q.label);
        const scores = questionScores.map(q => q.percentage);
        const backgroundColors = scores.map(s => {
            if (s >= 70) return this.riskColors.high;
            if (s >= 40) return this.riskColors.medium;
            return this.riskColors.low;
        });

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Puan Yüzdesi',
                    data: scores,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(c => c),
                    borderWidth: 1,
                    borderRadius: 4
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Soru Bazlı Puan Dağılımı',
                        font: { size: 16, weight: 'bold' },
                        color: this.colors.dark
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `Puan: ${context.raw}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) { return value + '%'; }
                        },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    y: {
                        grid: { display: false },
                        ticks: {
                            font: { size: 11 }
                        }
                    }
                }
            }
        });
    },

    /**
     * Risk Gauge Chart - Hız göstergesi tarzı
     * Genel risk skorunu gösterir
     */
    createRiskGaugeChart: function(ctx, score, profileName) {
        const normalizedScore = Math.min(100, Math.max(0, score));

        // Gauge için 3 bölge
        const gaugeData = [35, 30, 35]; // Düşük, Orta, Yüksek aralıkları
        const gaugeColors = [
            this.riskColors.low,
            this.riskColors.medium,
            this.riskColors.high
        ];

        // İğne pozisyonu için açı hesabı
        const needleValue = normalizedScore;

        // Doughnut chart ile gauge simülasyonu
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Düşük Risk', 'Orta Risk', 'Yüksek Risk'],
                datasets: [{
                    data: gaugeData,
                    backgroundColor: gaugeColors,
                    borderWidth: 0,
                    circumference: 180,
                    rotation: 270
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '70%',
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false },
                    title: {
                        display: true,
                        text: 'Risk Seviyesi',
                        font: { size: 16, weight: 'bold' },
                        color: this.colors.dark
                    }
                }
            },
            plugins: [{
                id: 'gaugeNeedle',
                afterDatasetDraw: (chart) => {
                    const { ctx, chartArea } = chart;
                    const centerX = (chartArea.left + chartArea.right) / 2;
                    const centerY = chartArea.bottom - 10;

                    // Skor metni
                    ctx.save();
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.font = 'bold 28px Arial';
                    ctx.fillStyle = this.colors.dark;
                    ctx.fillText(normalizedScore.toFixed(1) + '%', centerX, centerY - 30);

                    // Profil adı
                    ctx.font = 'bold 14px Arial';
                    ctx.fillStyle = profileName === 'low' ? this.riskColors.low :
                                   profileName === 'medium' ? this.riskColors.medium :
                                   this.riskColors.high;
                    const profileText = profileName === 'low' ? 'SAĞLAMCI' :
                                       profileName === 'medium' ? 'TEMKİNLİ' : 'AGRESİF';
                    ctx.fillText(profileText, centerX, centerY - 5);
                    ctx.restore();
                }
            }]
        });

        return chart;
    },

    /**
     * Portföy Dağılımı Doughnut Chart
     * Önerilen varlık dağılımını gösterir
     */
    createPortfolioDoughnutChart: function(ctx, allocation, title = 'Önerilen Portföy Dağılımı') {
        const labels = Object.keys(allocation);
        const data = Object.values(allocation).map(v => parseFloat(v));

        const backgroundColors = [
            this.colors.primary,
            this.colors.gold,
            this.colors.info,
            this.colors.warning,
            this.colors.purple,
            this.colors.danger
        ];

        return new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: backgroundColors.slice(0, labels.length),
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '50%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 15,
                            usePointStyle: true,
                            font: { size: 12 }
                        }
                    },
                    title: {
                        display: true,
                        text: title,
                        font: { size: 16, weight: 'bold' },
                        color: this.colors.dark
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: %${context.raw.toFixed(1)}`;
                            }
                        }
                    }
                }
            }
        });
    },

    /**
     * Risk Kapasitesi vs İstekliliği Karşılaştırma
     */
    createCapacityWillingnessChart: function(ctx, capacityScore, willingnessScore) {
        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Risk Kapasitesi', 'Risk İstekliliği'],
                datasets: [{
                    label: 'Skor',
                    data: [capacityScore, willingnessScore],
                    backgroundColor: [this.colors.info, this.colors.warning],
                    borderColor: [this.colors.info, this.colors.warning],
                    borderWidth: 1,
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Risk Kapasitesi vs İstekliliği',
                        font: { size: 16, weight: 'bold' },
                        color: this.colors.dark
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function(value) { return value + '%'; }
                        },
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    },

    /**
     * Soru Kategori Dağılımı - Grouped Bar
     */
    createCategoryChart: function(ctx, categoryScores) {
        const labels = categoryScores.map(c => c.category);
        const scores = categoryScores.map(c => c.score);
        const maxScores = categoryScores.map(c => c.maxScore);

        return new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Alınan Puan',
                        data: scores,
                        backgroundColor: this.colors.primary,
                        borderRadius: 4
                    },
                    {
                        label: 'Maksimum Puan',
                        data: maxScores,
                        backgroundColor: 'rgba(0, 166, 81, 0.2)',
                        borderColor: this.colors.primary,
                        borderWidth: 1,
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { usePointStyle: true }
                    },
                    title: {
                        display: true,
                        text: 'Kategori Bazlı Puan Dağılımı',
                        font: { size: 16, weight: 'bold' },
                        color: this.colors.dark
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(0,0,0,0.05)' }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });
    }
};

// Global'e ekle
if (typeof window !== 'undefined') {
    window.IPSCharts = IPSCharts;
}

