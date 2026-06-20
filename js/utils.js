// Generate Unique ID

function generateId(){

    return Date.now();

}

// Current Date

function getCurrentDate(){

    const today = new Date();

    return today.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );

}

// Completion Percentage

function calculatePercentage(
    total,
    completed
){

    if(total === 0){

        return 0;

    }

    return Math.round(
        (completed / total) * 100
    );

}

// Format Due Date

function formatDate(date){

    if(!date){

        return "No Date";

    }

    const d = new Date(date);

    return d.toLocaleDateString(
        "en-US",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}

// Toast Notification

function showToast(message){

    let toast =
    document.getElementById(
        "toast"
    );

    if(!toast){

        toast =
        document.createElement(
            "div"
        );

        toast.id = "toast";

        document.body.appendChild(
            toast
        );

        toast.style.position =
        "fixed";

        toast.style.bottom =
        "20px";

        toast.style.right =
        "20px";

        toast.style.background =
        "#2563eb";

        toast.style.color =
        "white";

        toast.style.padding =
        "12px 20px";

        toast.style.borderRadius =
        "12px";

        toast.style.boxShadow =
        "0 5px 15px rgba(0,0,0,.2)";

        toast.style.zIndex =
        "9999";

        toast.style.fontSize =
        "14px";
    }

    toast.textContent =
    message;

    toast.style.display =
    "block";

    setTimeout(() => {

        toast.style.display =
        "none";

    }, 2000);

}