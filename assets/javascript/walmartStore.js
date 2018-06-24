$(document).ready(function () {
    let city = window.localStorage.getItem("city");
    let zip = window.localStorage.getItem("zip");
    let apiKey = "8nvceubtr5ha96hcrf8g96r8";
    let prodResponse = [];
    let trCounter = 0;
    let container = $(".productContainer");
    let table = $("<table>");
    //----------------------------------------------------------------------------------------------------------

    function findWalmartStoresByCity(city, elemTag) {
        let query = "http://api.walmartlabs.com/v1/stores?apiKey=" + apiKey + "&city=" + city + "&format=json";
        $.ajax({
            url: query,
            method: "GET",
            dataType: 'jsonp'
        }).then(function (response) {
            displayResponseStores(response, elemTag);
        }).catch(function (err) {
            console.log(err);
        });
    }

    //----------------------------------------------------------------------------------------------------------    

    function findWalmartStoresByZip(zip, elemTag) {
        let query = "http://api.walmartlabs.com/v1/stores?apiKey=" + apiKey + "&zip=" + zip + "&format=json";
        $.ajax({
            url: query,
            method: "GET",
            dataType: 'jsonp'
        }).then(function (response) {
            displayResponseStores(response, elemTag);
        }).catch(function (err) {
        });
    }

    //----------------------------------------------------------------------------------------------------------

    function listWalmartStoresByCity(city) {

        console.log(container);
        container.empty();
        buildStoreHeader(container);
        findWalmartStoresByCity(city, container);
        console.log("hi");
    }

    //----------------------------------------------------------------------------------------------------------

    function buildStoreHeader(elemTag) {
        table = $("<table>");
        trCounter = 0;
        let tr = $("<tr>");
        let name = $("<td>");
        let nameDiv = $("<div>");
        let street = $("<td>");
        let streetDiv = $("<div>");
        let city = $("<td>");
        let cityDiv = $("<div>");
        let state = $("<td>");
        let stateDiv = $("<div>");
        let zip = $("<td>");
        let zipDiv = $("<div>");
        let phone = $("<td>");
        let phoneDiv = $("<div>");
        let openSundays = $("<td>");
        let openSundaysDiv = $("<div>");
        nameDiv.addClass("headerDiv");
        nameDiv.text("Store Name");
        name.append(nameDiv);
        streetDiv.addClass("headerDiv");
        streetDiv.text("Street");
        street.append(streetDiv);
        cityDiv.addClass("headerDiv");
        cityDiv.text("City");
        city.append(cityDiv);
        stateDiv.addClass("headerDiv");
        stateDiv.text("State");
        state.append(stateDiv);
        zipDiv.addClass("headerDiv");
        zipDiv.text("Zip Code");
        zip.append(zipDiv);
        phoneDiv.addClass("headerDiv");
        phoneDiv.text("Phone No.");
        phone.append(phoneDiv);
        openSundaysDiv.addClass("headerDiv");
        openSundaysDiv.text("Open Sundays");
        openSundays.append(openSundaysDiv);
        tr.addClass("trHeader");
        tr.append(name).append(street).append(city).append(state).append(zip).append(phone).append(openSundays);
        table.append(tr);
        elemTag.append(table);
        return true;
    }

    // [
    //     {
    //     "no": 5959,
    //     "name": "Houston Supercenter",
    //     "country": "US",
    //     "coordinates": [
    //     -95.401322,
    //     29.7728201
    //     ],
    //     "streetAddress": "111 Yale St",
    //     "city": "Houston",
    //     "stateProvCode": "TX",
    //     "zip": "77007",
    //     "phoneNumber": "713-860-0700",
    //     "sundayOpen": true,
    //     "timezone": "CST"
    //     },

    function displayResponseStores(response, category) {
        for (let i = 0; i < response.length; i++) {
            let item = response[i];
            let trM = $("<tr>");
            try {
                trCounter++;
                let nameM = $("<td>");
                let nameDivM = $("<div>");
                let streetM = $("<td>");
                let streetDivM = $("<div>");
                let cityM = $("<td>");
                let cityDivM = $("<div>");
                let stateM = $("<td>");
                let stateDivM = $("<div>");
                let zipM = $("<td>");
                let zipDivM = $("<div>");
                let phoneM = $("<td>");
                let phoneDivM = $("<div>");
                let openSundaysM = $("<td>");
                let openSundaysDivM = $("<div>");
                nameDivM.addClass("categoryDiv")
                nameDivM.text(item.name);
                nameM.append(nameDivM);
                streetDivM.addClass("categoryDiv")
                streetDivM.text(item.streetAddress);
                streetM.append(streetDivM);
                cityDivM.addClass("categoryDiv")
                cityDivM.text(item.city);
                cityM.append(cityDivM);
                stateDivM.addClass("categoryDiv")
                stateDivM.text(item.stateProvCode);
                stateM.append(stateDivM);
                zipDivM.addClass("categoryDiv")
                zipDivM.text(item.name);
                zipM.append(zipDivM);
                phoneDivM.addClass("categoryDiv")
                phoneDivM.text(item.phoneNumber);
                phoneM.append(phoneDivM);
                openSundaysDivM.addClass("categoryDiv")
                if (item.sundayOpen) {
                    openSundaysDivM.text("Yes");
                }
                else {
                    openSundaysDivM.text("No");
                }
                openSundaysM.append(openSundaysDivM);
                trM.append(nameM).append(streetM).append(cityM).append(stateM).append(zipM).append(phoneM).append(openSundaysM);

                table.append(trM);
            }
            catch (err) { console.log(err); }
        }
        return true;
    }

    if (city !== "" && zip === "") {
        listWalmartStoresByCity(city);
    }
    if (city === "" && zip !== "") {
        listWalmartStoresByCity(zip);
    }
});