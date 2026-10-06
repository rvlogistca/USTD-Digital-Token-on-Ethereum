"use strict";

/*
 * USTD — Digital Token on Ethereum
 */

const TOKEN = {
    name: "USTD",
    symbol: "USTD",
    decimals: 18,
    network: "Ethereum Mainnet",
    standard: "ERC-20",
    address: "0x4644E1113FE1a6bA831D85cc4772b3D0c23DE655",
    image: "./ustd-icon.svg"
};

const RESERVE_WALLET =
    "0xB0A27099582833c0Cb8C7A0565759fF145113d64";


/* =========================
   COPIAR ENDEREÇOS
========================= */

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
        console.warn("Clipboard API indisponível.");
    }

    try {

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const success =
            document.execCommand("copy");

        textarea.remove();

        return success;

    } catch (error) {

        console.error(error);

        return false;
    }
}


window.copyId = async function (id) {

    const element =
        document.getElementById(id);

    if (!element) return;

    const success =
        await copyText(element.textContent.trim());

    const button =
        element.parentElement.querySelector(".copy");

    if (!button) return;

    const original =
        button.textContent;

    button.textContent =
        success
            ? "✓ Copiado"
            : "Erro ao copiar";

    setTimeout(() => {

        button.textContent =
            original;

    }, 1800);

};


/* =========================
   COPIAR CONTRATO
========================= */

const copyContractBtn =
    document.getElementById(
        "copyContractBtn"
    );

if (copyContractBtn) {

    copyContractBtn.addEventListener(
        "click",
        async () => {

            const success =
                await copyText(TOKEN.address);

            copyContractBtn.textContent =
                success
                    ? "✓ Copiado"
                    : "Não foi possível copiar";

            setTimeout(() => {

                copyContractBtn.textContent =
                    "Copiar contrato";

            }, 1800);

        }
    );

}


/* =========================
   METAMASK
========================= */

const addWalletBtn =
    document.getElementById(
        "addWalletBtn"
    );

const walletStatus =
    document.getElementById(
        "walletStatus"
    );


if (addWalletBtn) {

    addWalletBtn.addEventListener(
        "click",
        async () => {

            if (!window.ethereum) {

                if (walletStatus) {

                    walletStatus.textContent =
                        "MetaMask não encontrada. Abra o site em um navegador com carteira Ethereum.";

                }

                return;
            }

            try {

                const added =
                    await window.ethereum.request({

                        method: "wallet_watchAsset",

                        params: {
                            type: "ERC20",

                            options: {
                                address: TOKEN.address,
                                symbol: TOKEN.symbol,
                                decimals: TOKEN.decimals,
                                image:
                                    new URL(
                                        TOKEN.image,
                                        window.location.href
                                    ).href
                            }
                        }

                    });

                if (walletStatus) {

                    walletStatus.textContent =
                        added
                            ? "✓ USTD adicionado à carteira."
                            : "A operação foi cancelada.";

                }

            } catch (error) {

                console.error(error);

                if (walletStatus) {

                    walletStatus.textContent =
                        "Não foi possível adicionar o token automaticamente.";

                }

            }

        }
    );

}


/* =========================
   GRÁFICO
========================= */

const canvas =
    document.getElementById(
        "usdtChart"
    );

const priceElement =
    document.getElementById(
        "price"
    );

const changeElement =
    document.getElementById(
        "change"
    );

const highElement =
    document.getElementById(
        "high"
    );

const lowElement =
    document.getElementById(
        "low"
    );


const chartData = {

    "1m": [
        0.9989,
        0.9991,
        0.9990,
        0.9993,
        0.9992,
        0.9995,
        0.9994,
        0.9997,
        0.9996,
        0.9998,
        0.9997,
        1.0000,
        0.9999,
        1.0000
    ],

    "30m": [
        0.9983,
        0.9987,
        0.9985,
        0.9990,
        0.9988,
        0.9993,
        0.9991,
        0.9996,
        0.9994,
        0.9998,
        0.9997,
        1.0000,
        0.9999,
        1.0000
    ],

    "1h": [
        0.9978,
        0.9981,
        0.9985,
        0.9983,
        0.9988,
        0.9986,
        0.9990,
        0.9989,
        0.9994,
        0.9992,
        0.9997,
        0.9995,
        0.9999,
        1.0000
    ]

};


function drawChart(range = "1m") {

    if (!canvas) return;

    const rect =
        canvas.getBoundingClientRect();

    const dpr =
        window.devicePixelRatio || 1;

    canvas.width =
        rect.width * dpr;

    canvas.height =
        rect.height * dpr;

    const ctx =
        canvas.getContext("2d");

    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

    const width =
        rect.width;

    const height =
        rect.height;

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const data =
        chartData[range] || chartData["1m"];

    const padding = 20;

    const min =
        Math.min(...data);

    const max =
        Math.max(...data);

    const spread =
        Math.max(max - min, 0.0001);


    /* LINHAS DE FUNDO */

    ctx.lineWidth = 1;

    for (
        let i = 1;
        i < 5;
        i++
    ) {

        const y =
            padding +
            ((height - padding * 2) / 5) * i;

        ctx.strokeStyle =
            "rgba(255,255,255,.055)";

        ctx.beginPath();

        ctx.moveTo(
            0,
            y
        );

        ctx.lineTo(
            width,
            y
        );

        ctx.stroke();

    }


    /* ÁREA */

    const points =
        data.map(
            (value, index) => {

                const x =
                    padding +
                    (index /
                        (data.length - 1)) *
                    (width - padding * 2);

                const y =
                    height -
                    padding -
                    ((value - min) /
                        spread) *
                    (height - padding * 2);

                return {
                    x,
                    y
                };

            }
        );


    const gradient =
        ctx.createLinearGradient(
            0,
            0,
            0,
            height
        );

    gradient.addColorStop(
        0,
        "rgba(38,161,123,.22)"
    );

    gradient.addColorStop(
        1,
        "rgba(38,161,123,0)"
    );


    ctx.beginPath();

    ctx.moveTo(
        points[0].x,
        height - padding
    );

    points.forEach(point => {

        ctx.lineTo(
            point.x,
            point.y
        );

    });

    ctx.lineTo(
        points[points.length - 1].x,
        height - padding
    );

    ctx.closePath();

    ctx.fillStyle =
        gradient;

    ctx.fill();


    /* LINHA */

    ctx.beginPath();

    points.forEach(
        (point, index) => {

            if (index === 0) {

                ctx.moveTo(
                    point.x,
                    point.y
                );

            } else {

                ctx.lineTo(
                    point.x,
                    point.y
                );

            }

        }
    );

    ctx.strokeStyle =
        "#26a17b";

    ctx.lineWidth = 2.5;

    ctx.stroke();


    /* PONTO FINAL */

    const last =
        points[points.length - 1];

    ctx.beginPath();

    ctx.arc(
        last.x,
        last.y,
        4,
        0,
        Math.PI * 2
    );

    ctx.fillStyle =
        "#50d1a5";

    ctx.fill();

    ctx.beginPath();

    ctx.arc(
        last.x,
        last.y,
        8,
        0,
        Math.PI * 2
    );

    ctx.strokeStyle =
        "rgba(80,209,165,.25)";

    ctx.lineWidth = 2;

    ctx.stroke();


    /* VALORES */

    const lastValue =
        data[data.length - 1];

    if (priceElement) {

        priceElement.textContent =
            "$" + lastValue.toFixed(4);

    }

    if (highElement) {

        highElement.textContent =
            "$" + max.toFixed(4);

    }

    if (lowElement) {

        lowElement.textContent =
            "$" + min.toFixed(4);

    }

    if (changeElement) {

        const first =
            data[0];

        const variation =
            ((lastValue - first) / first) * 100;

        changeElement.textContent =
            `${variation >= 0 ? "+" : ""}${variation.toFixed(3)}% • demonstrativo`;

    }

}


/* BOTÕES DO GRÁFICO */

const rangeButtons =
    document.querySelectorAll(
        ".range-btns button"
    );


rangeButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            rangeButtons.forEach(
                item =>
                    item.classList.remove(
                        "active"
                    )
            );

            button.classList.add(
                "active"
            );

            drawChart(
                button.dataset.r
            );

        }
    );

});


/* =========================
   SALDO ETH
========================= */

async function loadEthBalance() {

    const balanceElement =
        document.getElementById("bal");

    if (!balanceElement) return;

    const rpc =
        "https://cloudflare-eth.com";

    try {

        const response =
            await fetch(rpc, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    jsonrpc: "2.0",

                    method:
                        "eth_getBalance",

                    params: [
                        RESERVE_WALLET,
                        "latest"
                    ],

                    id: 1

                })

            });


        const data =
            await response.json();


        if (!data.result) {

            throw new Error(
                "Saldo indisponível"
            );

        }


        const wei =
            BigInt(data.result);


        const base =
            1000000000000000000n;


        const whole =
            wei / base;

        const fraction =
            wei % base;


        const fractionText =
            fraction
                .toString()
                .padStart(18, "0")
                .slice(0, 4);


        balanceElement.textContent =
            `${whole.toLocaleString("pt-BR")},${fractionText} ETH`;

    } catch (error) {

        console.warn(
            "Não foi possível consultar o saldo ETH:",
            error
        );

        balanceElement.textContent =
            "Indisponível";

    }

}


/* =========================
   ANO
========================= */

const yearElement =
    document.getElementById(
        "currentYear"
    );

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================
   INICIALIZAÇÃO
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        drawChart("1m");

        loadEthBalance();

    }
);


window.addEventListener(
    "resize",
    () => {

        const active =
            document.querySelector(
                ".range-btns button.active"
            );

        drawChart(
            active?.dataset.r || "1m"
        );

    }
);
