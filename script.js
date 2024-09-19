'use strict';

const currentDate = new Date();
const currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
currentMonth++;
const currentYear = currentDate.getFullYear();
//########################################################
const insertBtn = document.querySelector(".insert-btn");
const resultText = document.querySelectorAll(".result-text");
const dayInput = document.querySelector(".day-input");
const monthInput = document.querySelector(".month-input");
const yearInput = document.querySelector(".year-input");
const errorMessage = document.querySelectorAll(".error-message");
const yearText = document.querySelector(".year-text");
const monthText = document.querySelector(".month-text");
const dayText = document.querySelector(".day-text");
//########################################################

const months = [1,3,5,7,8,10,12];

const errorExist = function(input){
    input.classList.add("error");
    input.previousElementSibling.classList.add("error-text");
}

const errorWrong = function(input){
    removeErrorMessage(5000,input);
    input.nextElementSibling.classList.remove("hidden");
    input.nextElementSibling.textContent = "*Wrong Value";
    errorExist(input);
    return;
}

const errorEmpty = function(input){
    input.nextElementSibling.classList.remove("hidden");
    errorExist(input);
    removeErrorMessage(5000,input);
}

const checkEmptyError = function(){
    let check = false
    if(dayInput.value === '') {
        errorEmpty(dayInput);
        check = true;
    };
    if(monthInput.value === '') {
        errorEmpty(monthInput);
        check = true;
    };
    if(yearInput.value === '')  {
        errorEmpty(yearInput);
        check = true;
    };
    return check;
}

const checkInput = function(){
    let check = false;
    months.forEach((month) => {
        if(Number(dayInput.value) > 31 && Number(monthInput.value) !== month) {
            errorWrong(dayInput);
            check = true;
        }
    })
    if(Number(dayInput.value) > 29 && Number(monthInput.value) === 2) {
        errorWrong(dayInput);
        check = true;
    }

    if(Number(dayInput.value) > 28 && (Number(yearInput.value) % 4) !== 0){
        errorWrong(dayInput);
        check = true;
    }

    if(Number(monthInput.value) > 12 || Number(monthInput.value) < 0){
        errorWrong(monthInput);
        check = true;
    }

    if(Number(yearInput.value) < 0 || Number(yearInput.value) >= currentYear && Number(monthInput.value) > (currentMonth -= 2) || Number(yearInput.value) > currentYear){
        errorWrong(yearInput);
        check = true;
        currentMonth = currentDate.getMonth();
    }
    return check;
}

const removeErrorMessage = function(timeout,input){
    setTimeout(() => {
        errorMessage.forEach((error) => error.classList.add("hidden"));
        input.classList.remove("error");
        input.previousElementSibling.classList.remove("error-text");
    },timeout);
}

const checkError = function(){
    if(!checkEmptyError() && !checkInput()){
        const day = Number(dayInput.value);
        const month = Number(monthInput.value);
        const year = Number (yearInput.value);
        calculateAge(day,month,year);
    }
}   

const calculateAge = function(day,month,year){
    let newDay = currentDay - day;
    let newMonth = currentMonth - month;
    let newYear = currentYear - year;
    if(newMonth < 0){
        newMonth = 12 + newMonth;
        newYear--;
    }

    if(newDay < 0){
        newDay++;
        newDay = 30 + newDay;
        newMonth--;
    }

    if(newDay < 10) newDay = '0' + newDay;
    if(newMonth < 10) newMonth = '0' + newMonth;
    if(newYear < 10) newYear = '0' + newYear;
    yearText.textContent = `${newYear}`;
    monthText.textContent = `${newMonth}`;
    dayText.textContent = `${newDay}`;
}

const startCalculating = function(e){
    e.preventDefault();
    checkInput();
    checkError();
    dayInput.value = monthInput.value = yearInput.value = '';
    dayInput.focus();
}

//#################################################### Functions ###################################################

dayInput.focus();

insertBtn.addEventListener("click",startCalculating);

document.addEventListener("keydown",function(e){
    if(e.key === "Enter") startCalculating(e);
});