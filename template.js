function loadNavbar(isProjectPage = false) {
  const url = "session_handler.php?" + new Date().getTime();

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let authLinks;
      if (data.isLoggedIn) {
        authLinks = `
              <li class="nav-item">
                  <a class="nav-link" href="account.php">Moje Konto</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="logout.php">Wyloguj</a>
              </li>
          `;
      } else {
        authLinks = `
              <li class="nav-item">
                  <a class="nav-link" href="register.php">Rejestracja</a>
              </li>
              <li class="nav-item">
                  <a class="nav-link" href="login.php">Logowanie</a>
              </li>
          `;
      }

      const navbarContainer = document.getElementById("navigation");
      const navbarTemplate = `
          <nav class="navbar navbar-expand-lg">
              <a class="navbar-brand" href="index.html">Hackowanie</a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNav">
                  <ul class="navbar-nav nav-item1">
                      <li class="nav-item"><a class="nav-link" href="page1.html">Hardware</a></li>
                      <li class="nav-item"><a class="nav-link" href="page2.html">Software</a></li>
                      <li class="nav-item"><a class="nav-link" href="page3.html">Projects</a></li>
                      <li class="nav-item"><a class="nav-link" href="page4.html">Podstrona 4</a></li>
                      <li class="nav-item"><a class="nav-link" href="page5.html">Podstrona 5</a></li>
                  </ul>
                  <ul class="navbar-nav nav-item2 ml-auto">
                      ${authLinks}
                  </ul>
              </div>
          </nav>
        `;

      navbarContainer.innerHTML = navbarTemplate;
    })
    .catch((error) => {
      console.error("Error fetching session data:", error);
    });
}
