(() => {
    "use strict";

    // =====================================================
    // CONFIGURAÇÃO DO TOKEN
    // =====================================================

    const TOKEN = {
        name: "USTD",
        symbol: "USTD",
        network: "Ethereum Mainnet",
        standard: "ERC-20",
        decimals: 18,

        address:
            "0x4644E1113FE1a6bA831D85cc4772b3D0c23DE655",

        image: "./ustd-icon.svg"
    };


    // Carteira pública informada para referência
    const WALLET_ADDRESS =
        "0x26Ef6c3AF50240F211E774213914f8DB526fA77d";


    // =====================================================
    // ELEMENTOS
    // =====================================================

    const copyBtn =
        document.getElementById("copyBtn");

    const copyStatus =
        document.getElementById("copyStatus");

    const addWalletBtn =
        document.getElementById("addWalletBtn");

    const walletStatus =
        document.getElementById("walletStatus");

    const copyWalletBtn =
        document.getElementById("copyWalletBtn");

    const walletCopyStatus =
        document.getElementById("walletCopyStatus");

    const currentYear =
        document.getElementById("currentYear");


    // =====================================================
    // COPIAR TEXTO
    // =====================================================

    async function copyText(text) {

        if (!text) {
            return false;
        }

        try {

            if (
                navigator.clipboard &&
                window.isSecureContext
            ) {
                await navigator.clipboard.writeText(text);

                return true;
            }

        } catch (error) {

            console.warn(
                "Clipboard API indisponível:",
                error
            );
        }


        // Fallback para celulares/navegadores antigos

        try {

            const textarea =
                document.createElement("textarea");

            textarea.value = text;

            textarea.setAttribute(
                "readonly",
                ""
            );

            textarea.style.position =
                "fixed";

            textarea.style.left =
                "-9999px";

            textarea.style.top =
                "0";

            document.body.appendChild(
                textarea
            );

            textarea.focus();
            textarea.select();

            const copied =
                document.execCommand("copy");

            textarea.remove();

            return copied;

        } catch (error) {

            console.error(
                "Erro ao copiar:",
                error
            );

            return false;
        }
    }


    // =====================================================
    // COPIAR CONTRATO
    // =====================================================

    async function copyContract() {

        const success =
            await copyText(
                TOKEN.address
            );


        if (copyStatus) {

            copyStatus.textContent =
                success
                    ? "✓ Endereço do contrato copiado."
                    : "Não foi possível copiar automaticamente.";
        }


        if (copyBtn) {

            copyBtn.textContent =
                success
                    ? "✓"
                    : "×";

            setTimeout(() => {

                copyBtn.textContent = "⧉";

                if (copyStatus) {
                    copyStatus.textContent = "";
                }

            }, 2500);
        }
    }


    // =====================================================
    // COPIAR CARTEIRA
    // =====================================================

    async function copyWallet() {

        const success =
            await copyText(
                WALLET_ADDRESS
            );


        if (walletCopyStatus) {

            walletCopyStatus.textContent =
                success
                    ? "✓ Endereço da carteira copiado."
                    : "Não foi possível copiar automaticamente.";
        }


        if (copyWalletBtn) {

            copyWalletBtn.textContent =
                success
                    ? "✓"
                    : "×";

            setTimeout(() => {

                copyWalletBtn.textContent =
                    "⧉";

                if (walletCopyStatus) {
                    walletCopyStatus.textContent =
                        "";
                }

            }, 2500);
        }
    }


    // =====================================================
    // ADICIONAR TOKEN À METAMASK
    // =====================================================

    async function addTokenToWallet() {

        if (!window.ethereum) {

            if (walletStatus) {

                walletStatus.textContent =
                    "Instale ou abra uma carteira compatível com Ethereum, como MetaMask.";
            }

            return;
        }


        try {

            const wasAdded =
                await window.ethereum.request({

                    method:
                        "wallet_watchAsset",

                    params: {

                        type: "ERC20",

                        options: {

                            address:
                                TOKEN.address,

                            symbol:
                                TOKEN.symbol,

                            decimals:
                                TOKEN.decimals,

                            image:
                                window.location.origin +
                                "/" +
                                TOKEN.image.replace(
                                    "./",
                                    ""
                                )
                        }
                    }
                });


            if (walletStatus) {

                walletStatus.textContent =
                    wasAdded
                        ? "✓ USTD foi adicionado à carteira."
                        : "A solicitação foi cancelada.";
            }

        } catch (error) {

            console.error(
                "Erro ao adicionar token:",
                error
            );


            if (walletStatus) {

                walletStatus.textContent =
                    "Não foi possível adicionar o token. Verifique sua carteira.";
            }
        }
    }


    // =====================================================
    // EVENTOS
    // =====================================================

    if (copyBtn) {

        copyBtn.addEventListener(
            "click",
            copyContract
        );
    }


    if (copyWalletBtn) {

        copyWalletBtn.addEventListener(
            "click",
            copyWallet
        );
    }


    if (addWalletBtn) {

        addWalletBtn.addEventListener(
            "click",
            addTokenToWallet
        );
    }


    // =====================================================
    // ANO AUTOMÁTICO
    // =====================================================

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();
    }


    // =====================================================
    // INFORMAÇÕES NO CONSOLE
    // =====================================================

    console.info(
        "USTD inicializado:",
        TOKEN
    );

})();
