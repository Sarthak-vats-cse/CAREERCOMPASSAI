/* Career Compass AI — Results Dashboard */

function initResultsPage() {

    mountLayout("results.html");

    const assessment = loadAssessmentFromSession();
    const cached = loadResultsFromSession();

    // =====================================
    // Resume Upload Flow
    // =====================================

    if (cached) {

        renderResults(cached);

        if (assessment) {
            refreshFromAPI(assessment);
        }

        return;
    }

    // =====================================
    // Nothing Found
    // =====================================

    if (!assessment) {

        document.getElementById("resultsContent").innerHTML = `
            <div class="empty-state card" style="padding:4rem;">
                <h2 style="margin-bottom:1rem;">
                    No Assessment Found
                </h2>

                <p style="color:var(--text-secondary);margin-bottom:2rem;">
                    Complete the assessment or upload a resume first.
                </p>

                <div style="display:flex;gap:1rem;justify-content:center;">

                    <a href="assessment.html"
                       class="btn btn-primary">
                        Start Assessment
                    </a>

                    <a href="resume.html"
                       class="btn btn-secondary">
                        Upload Resume
                    </a>

                </div>

            </div>
        `;

        return;
    }

    // =====================================
    // Assessment Flow
    // =====================================

    document.getElementById("resultsContent").innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Analyzing your career profile...</p>
        </div>
    `;

    loadResults(assessment);

}



async function loadResults(assessment) {

    try {

        const results = await fetchRecommendation(assessment);

        saveResultsToSession(results);

        renderResults(results);

    }

    catch (err) {

        console.warn(
            "Backend unavailable, using demo data:",
            err.message
        );

        const demo = getDemoResults(assessment);

        saveResultsToSession(demo);

        renderResults(demo, true);

    }

}



async function refreshFromAPI(assessment) {

    try {

        const results = await fetchRecommendation(assessment);

        saveResultsToSession(results);

        renderResults(results);

    }

    catch (_) {

        // Keep cached data

    }

}



function renderResults(data, isDemo = false) {

    const container =
        document.getElementById("resultsContent");

    const matches =
        data.top_career_matches || [];

    const missingSkills =
        data.missing_skills || [];

    const certs =
        data.recommended_certifications || [];

    const roadmap =
        data.recommended_learning_path || [];

    const insight =
        data.career_insight || {};

    container.innerHTML = `

        ${isDemo
            ? `<div class="info-banner">
                    Showing demo data — Backend unavailable.
               </div>`
            : ""}

        <div class="dashboard-grid">

            <div class="dashboard-sidebar">

                ${renderReadinessScoreCard(
                    data.career_readiness_score || 0,
                    data.readiness_level || "Developing"
                )}

                <div class="card">

                    <h3 class="card-title">
                        Top Career Matches
                    </h3>

                    <div id="matchesContainer">

                        ${
                            matches.length

                            ?

                            matches.map((m, i) =>

                                renderProgressBar(
                                    m.career || m.name,
                                    m.match_percentage || m.score || 0,
                                    i * 150
                                )

                            ).join("")

                            :

                            `<div class="empty-state">
                                No matches found.
                            </div>`

                        }

                    </div>

                </div>

            </div>



            <div class="dashboard-main">

                <div class="card">

                    <h3 class="card-title">
                        Skill Gap Analysis
                    </h3>

                    <p class="form-hint"
                       style="margin-bottom:1rem;">

                        Skills to develop for your top career.

                    </p>

                    ${
                        missingSkills.length

                        ?

                        renderSkillTags(
                            missingSkills,
                            { missing: true }
                        )

                        :

                        `<div class="empty-state">
                            No skill gaps identified.
                        </div>`

                    }

                </div>



                <div class="dashboard-row">

                    <div class="card">

                        <h3 class="card-title">
                            Recommended Certifications
                        </h3>

                        <div style="
                            display:flex;
                            flex-direction:column;
                            gap:1rem;
                            margin-top:.5rem;
                        ">

                        ${
                            certs.length

                            ?

                            certs.map(

                                c => renderCertificationCard(c)

                            ).join("")

                            :

                            `<div class="empty-state">
                                No certifications available.
                            </div>`

                        }

                        </div>

                    </div>



                    <div class="card">

                        <h3 class="card-title">
                            Learning Roadmap
                        </h3>

                        ${renderRoadmapTimeline(roadmap)}

                    </div>

                </div>



                <div id="careerInsightSection">

                    ${renderCareerInsightCard(
                        insight,
                        "Career Insights"
                    )}

                </div>

            </div>

        </div>



        <div style="
            margin-top:2rem;
            display:flex;
            gap:1rem;
            justify-content:center;
            flex-wrap:wrap;
        ">

            <a href="assessment.html"
               class="btn btn-secondary">

                Retake Assessment

            </a>

            <a href="explorer.html"
               class="btn btn-primary">

                Explore All Careers

            </a>

        </div>

    `;

    animateProgressBars(

        document.getElementById("matchesContainer")

    );

}



document.addEventListener(

    "DOMContentLoaded",

    initResultsPage

);