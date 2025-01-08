function loadNavbar(isProjectPage = false) {
    const prefix = isProjectPage ? '../' : '';
    
    fetch('check_login.php')
        .then(response => response.json())
        .then(data => {
            const authLinks = data.isLoggedIn ? `
                <li class="nav-item">
                    <a class="nav-link" href="${prefix}account.php">Moje Konto</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${prefix}logout.php">Wyloguj</a>
                </li>
            ` : `
                <li class="nav-item">
                    <a class="nav-link" href="${prefix}rejestracja.html">Rejestracja</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="${prefix}logowanie.html">Logowanie</a>
                </li>
            `;

            const navbarTemplate = `
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="${prefix}index.html">Hackowanie</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav nav-item1">
                        <li class="nav-item">
                            <a class="nav-link" href="${prefix}page1.html">Hardware</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${prefix}page2.html">Software</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${prefix}page3.html">Projcets</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${prefix}page4.html">Podstrona 4</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${prefix}page5.html">Podstrona 5</a>
                        </li>
                    </ul>
                    <ul class="navbar-nav nav-item2 ml-auto">
                        ${authLinks}
                    </ul>
                </div>
            </nav>
            `;
            
            document.getElementById('navigation').innerHTML = navbarTemplate;
        });
}