document.addEventListener("DOMContentLoaded", async () => {
    const auth0Client = await auth0.createAuth0Client({
        domain: "dev-8bme4f6pagahcrue.eu.auth0.com",
        clientId: "LUHuBRRJh6EnMtAjtztME7j87oDeV3W8",
        authorizationParams: {
            redirect_uri: "http://127.0.0.1:5500/index.html"
        }
    });

    const authButton = document.getElementById("auth-button");

    // ✅ Pārbauda, vai lietotājs ir jau pierakstījies
    const isAuthenticated = await auth0Client.isAuthenticated();

    if (isAuthenticated) {
        const user = await auth0Client.getUser();
        authButton.textContent = `Sveiks, ${user.name}`;
        authButton.addEventListener("click", async () => {
            await auth0Client.logout({ returnTo: "http://127.0.0.1:5500/index.html" });
        });
    } else {
        authButton.addEventListener("click", async () => {
            await auth0Client.loginWithRedirect();
        });
    }

    // ✅ Ja lietotājs atgriežas pēc pierakstīšanās, apstrādā Auth0 atbildi
    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        await auth0Client.handleRedirectCallback();
        window.location.replace(window.location.pathname);
    }
});
