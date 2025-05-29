---
layout: page
title: Create Post
---

<div class="create-post-page">
    <div class="card">
        <h1 style="margin-top: 0;">Create new post</h1>
        <input type="text" placeholder="Title" class="text-input title-text">
        <div style="min-height: 25px;"></div>
        <div class="body-text-controls" id="body-text-controls">
            <div class="body-text-group">
                <button data-command="bold"><i class="fa-solid fa-bold"></i></button>
                <button data-command="italic"><i class="fa-solid fa-italic"></i></button>
                <button data-command="underline"><i class="fa-solid fa-underline"></i></button>
            </div>
            <div class="body-text-group">
                <button data-command="insertUnorderedList"><i class="fa-solid fa-list-ul"></i></button>
            </div>
            <div class="body-text-group">
                <button data-command="createLink"><i class="fa-solid fa-link"></i></button>
                <button data-command="unlink"><i class="fa-solid fa-unlink"></i></button>
            </div>
        </div>
        <div class="text-input body-text" id="editor" contenteditable="true"></div>
        <div id="status-bar" style="margin-top: 10px; font-size: 12px; color: #666;">0 words</div>
        <div style="min-height: 25px;"></div>
        <div class="buttons">
            <input type="submit" class="button cancel" value="Cancel">
            <input type="submit" class="button save" value="Save">
            <input type="submit" class="button submit" value="Post">
        </div>
    </div>
</div>

<script>
    const editor = document.getElementById("editor");
    const buttons = document.querySelectorAll("#body-text-controls button");

    const commandMap = {
        "fa-bold": "bold",
        "fa-italic": "italic",
        "fa-underline": "underline",
        "fa-link": "createLink",
        "fa-unlink": "unlink",
        "fa-list-ul": "insertUnorderedList"
    };

    // Word count
    function updateWordCount() {
        const text = editor.innerText || "";
        const words = text.trim().split(/\s+/).filter(Boolean).length;
        document.getElementById("status-bar").textContent = `${words} word${words !== 1 ? "s" : ""}`;
    }
    editor.addEventListener("input", updateWordCount);
    updateWordCount();

    function isLinkActive() {
        const selection = window.getSelection();
        if (!selection.rangeCount) return false;
        let node = selection.anchorNode;
        while (node) {
            if (node.nodeName === "A") return true;
            node = node.parentNode;
        }
        return false;
    }

    function updateToolbarState() {
        buttons.forEach((button) => {
            const icon = button.querySelector("i");
            if (!icon) return;

            const className = Array.from(icon.classList).find((cls) => commandMap[cls]);
            const command = commandMap[className];
            if (!command) return;

            let isActive = false;

            if (command === "createLink") {
                isActive = isLinkActive();
            } else {
                isActive = document.queryCommandState(command);
            }

            button.classList.toggle("active", isActive);
        });
    }

    function execCmd(command, value = null) {
        if (command === "createLink") {
            const url = prompt("Enter URL:");
            if (!url) return;
            document.execCommand("createLink", false, url);
        } else {
            document.execCommand(command, false, value);
        }
        updateToolbarState();
    }

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const icon = button.querySelector("i");
            const className = Array.from(icon.classList).find((cls) => commandMap[cls]);
            const command = commandMap[className];
            if (command) execCmd(command);
        });
    });

    document.addEventListener("selectionchange", updateToolbarState);
    editor.addEventListener("keyup", updateToolbarState);
    editor.addEventListener("mouseup", updateToolbarState);
</script>

<style>
    .create-post-page {
        font-family: "Montserrat", sans-serif;
    }

    @media (max-width: 900px) {
        .create-post-page {
            width: 100%;
            position: relative;
        }

        .card {
            width: 85% !important;
            padding: 10px !important;
        }

        .body-text-controls button {
            width: 30px !important;
            height: 30px !important;
            font-size: 13px !important;
        }

        .body-text-controls,
        .body-text-group {
            gap: 5px !important
        }
    }

    @media (max-width: 475px) {
        .card h1 {
            font-size: 8vw;
            text-align: center;
        }
    }

    .card {
        margin: 50px auto;
        width: 800px;
        background-color: white;
        border: 1px solid #e5e5e5;
        box-shadow: 0 0 5px #222222;
        border-radius: 7px;
        padding: 20px 25px;
        position: relative;
    }

    .text-input {
        max-width: 100%;
        border: 2px solid #ced4da;
        padding: 10px 15px;
        border-radius: 7px;
        outline: none !important;
        box-sizing: border-box;
    }

    .title-text {
        width: 100%;
    }

    .body-text {
        min-height: 500px;
        max-height: 500px;
        border-radius: 0px 0px 7px 7px !important;
        overflow-y: auto;
    }

    .body-text-controls {
        border: 2px solid #ced4da;
        padding: 10px 15px;
        border-radius: 7px 7px 0 0;
        max-width: 100%;
        border-bottom: 0;
        background-color: #f1f3f5;
        display: flex;
        gap: 50px;
    }

    .body-text-group {
        display: flex;
        gap: 10px;
    }

    .body-text-controls button {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        color: #495057;
        font-size: 20px;
        font-weight: 700;
        border-radius: 7px;
        padding: 5px;
        cursor: pointer;
        transition: 0.3s ease;
        border: 1px solid #ced4da;
    }

    .body-text-controls button:not(.active):hover {
        background-color: #747474;
        color: white;
    }

    .body-text-controls button.active {
        background-color: #007bff;
        border-color: #007bff;
        color: #ffffff;
    }

    .buttons {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: flex-end;
    }

    .button {
        width: fit-content;
        color: white;
        font-size: 14px;
        font-weight: 700;
        border-radius: 7px;
        padding: 7px 10px;
        cursor: pointer;
        transition: 0.3s ease;
    }

    .submit {
        background-color: #007bff;
        border: 2px solid #006adb;
    }

    .submit:hover {
        background-color: #006adb;
    }

    .save {
        background-color: #00dd12;
        border: 2px solid #00b40f;
    }

    .save:hover {
        background-color: #00b40f;
    }

    .cancel {
        background-color: #efefef;
        border: 2px solid #e2e2e2;
        color: black !important;
    }

    .cancel:hover {
        background-color: #e2e2e2;
    }
</style>
