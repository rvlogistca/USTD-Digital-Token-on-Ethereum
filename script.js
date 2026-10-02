(() => {
    "use strict";

    const TOKEN = {
        address: "0x4644E1113FE1a6bA831D85cc4772b3D0c23DE655",
        symbol: "USTD",
        decimals: 18,
        image: "./ustd-icon.svg"
    };

    const WALLET_ADDRESS =
        "0x26Ef6c3AF50240F211E774213914f8DB526fA77d";


    const $ = (id) =>
        document.getElementById(id);


    const copyBtn =
        $("copyBtn");

    const copyStatus =
        $("copyStatus");

    const addWalletBtn =
        $("addWalletBtn");

    const walletStatus =
        $("walletStatus");

    const copyWalletBtn =
        $("copyWalletBtn");

    const walletCopyStatus =
        $("walletCopyStatus");


    async function copyText(text) {

        try {

            await navigator.clipboard.writeText(text);

            return true;

        } catch {

            const textarea =
                document.createElement("textarea");

            textarea.value = text;

            textarea.style.position = "fixed";
            textarea.style.opacity = "0";

            document.body.appendChild(
                textarea
            );

            textarea.select();

            let ok = false;

            try {

                ok =
                    document.execCommand("copy");

            } catch {

                ok = false;

            }

            textarea.remove();

            return ok;
        }
    }


    async function copyContract() {

        const ok =
            await copyText(TOKEN.address);

        if (!copyStatus) return;

        copyStatus.textContent = ok
            ? "Contrato copiado."
            : "Não foi possível copiar automaticamente.";

        if (ok && copyBtn) {

            copyBtn.textContent = "✓";

            setTimeout(() => {

                copyStatus.textContent = "";

                copyBtn.textContent = "⧉";

            }, 2200);
        }
    }


    async function addTokenToWallet() {

        if (!walletStatus) return;

        walletStatus.textContent = "";


        if (!window.ethereum) {

            walletStatus.textContent =
                "Carteira Ethereum não detectada. Abra esta página pelo navegador da sua carteira.";

            return;
        }


        try {

            const added =
                await window.ethereum.request({

                    method:
                        "wallet_watchAsset",

                    params: {

                        type:
                            "ERC20",

                        options: {

                            address:
                                TOKEN.address,

                            symbol:
                                TOKEN.symbol,

                            decimals:
                                TOKEN.decimals,

                            image:
                                new URL(
                                    TOKEN.image,
                                    window.location.href
                                ).href
                        }
                    }
                });


            walletStatus.textContent =
                added
                    ? "USTD enviado para adição à carteira."
                    : "A carteira não confirmou a adição.";

        } catch (error) {

            console.error(error);

            walletStatus.textContent =
                "Não foi possível adicionar automaticamente. Tente novamente pela carteira.";
        }
    }


    async function copyWallet() {

        const ok =
            await copyText(WALLET_ADDRESS);

        if (!walletCopyStatus) return;

        walletCopyStatus.textContent = ok
            ? "Endereço da carteira copiado."
            : "Não foi possível copiar o endereço.";

        if (ok) {

            setTimeout(() => {

                walletCopyStatus.textContent = "";

            }, 2500);
        }
    }


    window.USTD = {

        token:
            TOKEN,

        wallet:
            WALLET_ADDRESS,

        copyWallet:
            copyWallet
    };


    copyBtn?.addEventListener(
        "click",
        copyContract
    );


    addWalletBtn?.addEventListener(
        "click",
        addTokenToWallet
    );


    copyWalletBtn?.addEventListener(
        "click",
        copyWallet
    );

})();
