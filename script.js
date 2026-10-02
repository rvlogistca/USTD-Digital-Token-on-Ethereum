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
    // ELEMENTOS DA PÁGINA
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


    // =====================================================
    // COPIAR TEXTO
    // =====================================================

    async function copyText(text) {

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


        // Método alternativo para celulares
        try {

            const textarea =
                document.createElement("textarea");

            textarea.value = text;

            textarea.style.position = "fixed";
            textarea.style.left = "-9999px";
            textarea.style.top = "0";

            document.body.appendChild(textarea);

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

        if (!copyBtn) return;

        const success =
            await copyText(TOKEN.address);


        if (copyStatus) {

            copyStatus.textContent =
                success
                    ? "✓ Endereço do contrato copiado."
                    : "Não foi possível copiar automaticamente.";

        }


        if (success) {

            copyBtn.textContent = "✓";

            setTimeout(() => {

                copyBtn.textContent = "⧉";

                if (copyStatus) {
                    copyStatus.textContent = "";
                }

            }, 2500);
        }
    }


   
