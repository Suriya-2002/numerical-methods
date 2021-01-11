const navigationToggler = document.querySelector('.navigation__lines');
const navigationBackground = document.querySelector('.navigation__background');
const navigationLink = document.querySelectorAll('.navigation__link');

let methodLink = document.querySelectorAll('.method__link');
methodLink = [...methodLink, ...navigationLink];

const navigationActive = () => {
    gsap.to('.navigation__background', {
        width: '125vw',
        height: '200vh',
        duration: 0.8,
        ease: 'power4.out',
    });
    gsap.to('.navigation__line--1', {
        top: '5rem',
        rotate: '135deg',
        duration: 0.3,
    });
    gsap.to('.navigation__line--2', {
        opacity: 0,
        duration: 0.3,
    });
    gsap.to('.navigation__line--3', {
        top: '5rem',
        rotate: '-135deg',
        duration: 0.3,
    });
    gsap.to('.navigation__item', {
        x: '70vw',
        opacity: 1,
        pointerEvents: 'all',
        stagger: 0.1,
        duration: 0.5,
    });
};

const navigationInactive = () => {
    gsap.to('.navigation__background', {
        width: 0,
        height: 0,
        duration: 0.8,
        ease: 'power2.in',
    });
    gsap.to('.navigation__line--1', {
        top: '3.5rem',
        rotate: '0',
        duration: 0.3,
    });
    gsap.to('.navigation__line--2', {
        opacity: 1,
        duration: 0.3,
    });
    gsap.to('.navigation__line--3', {
        top: '6.5rem',
        rotate: '0',
        duration: 0.3,
    });
    gsap.to('.navigation__item', {
        x: '160rem',
        opacity: 0,
        pointerEvents: 'none',
        stagger: -0.1,
        duration: 0.5,
    });
};

navigationToggler.addEventListener('click', () => {
    gsap.to('.navigation__tool-tip', { opacity: 0, x: -100, duration: 0.5 });
    navigationBackground.classList.toggle('navigation--active');
    if (navigationBackground.classList.contains('navigation--active')) navigationActive();
    else navigationInactive();
});

document.body.addEventListener('click', event => {
    if (navigationBackground.classList.contains('navigation--active')) {
        if (
            event.target.classList.contains('navigation--active') ||
            event.target.classList.contains('navigation__lines') ||
            event.target.classList.contains('navigation__line')
        ) {
        } else {
            navigationBackground.classList.remove('navigation--active');
            navigationInactive();
        }
    }
});

document.querySelector('.coverpage-title').addEventListener('click', () => {
    document.querySelector('.information--intro').style.display = 'block';
    document.querySelectorAll('.method').forEach(method => {
        method.classList.remove('method--active');
    });
});

methodLink.forEach(link => {
    link.addEventListener('click', event => {
        resetTable();
        if (navigationBackground.classList.contains('navigation--active'))
            navigationBackground.classList.toggle('navigation--active');
        navigationInactive();
        document.querySelectorAll('.method').forEach(method => {
            document.querySelector('.information--intro').style.display = 'none';
            method.classList.remove('method--active');
            if (method.getAttribute('data-method') === event.target.getAttribute('data-method'))
                method.classList.add('method--active');
        });
    });
});

const generateInitialGuess = (question, regex) => {
    let startPositive = 0,
        startNegative = 0,
        nextPositive = 1,
        nextNegative = -1,
        i = 0;

    while (i < 5000) {
        if (
            math.evaluate(question.replace(regex, startPositive.toString())) *
                math.evaluate(question.replace(regex, nextPositive.toString())) <=
            0
        )
            return startPositive;
        else if (
            math.evaluate(question.replace(regex, startNegative.toString())) *
                math.evaluate(question.replace(regex, nextNegative.toString())) <=
            0
        )
            return nextNegative;

        startPositive++;
        nextPositive++;
        startNegative--;
        nextNegative--;
        i++;
    }
};

const resetTable = () => {
    document.querySelector('.table').style.display = 'table';
    document.querySelector('.table__head .table__row').innerHTML = '';
    document.querySelector('.table__body').innerHTML = '';
    document.querySelector('.result-text').style.display = 'none';
};

const createTable = (tableHeadElements, ...values) => {
    resetTable();
    const tableHead = document.querySelector('.table__head .table__row');
    document.querySelector('.result-text').style.display = 'flex';

    for (let i = 0; i < tableHeadElements.length; i++) {
        const cell = tableHead.insertCell(i);
        cell.classList.add('table__cell');
        cell.innerHTML = tableHeadElements[i];
    }

    const tableBody = document.querySelector('.table__body');
    for (let i = 0; i < values[0].length; i++) {
        const row = tableBody.insertRow(i);
        row.classList.add('table__row');

        for (let j = 0; j < values.length; j++) {
            const cell = row.insertCell(j);
            cell.innerHTML = values[j][i];
            cell.classList.add('table__cell');
        }
    }
};

const removeInput = element => element.parentNode.remove();

document.querySelector('.form__btn--bisection-method').addEventListener('click', event => {
    event.preventDefault();
    resetTable();

    let question = document.querySelector('.form__question--bisection-method').value;
    let initialGuess1 = parseFloat(document.querySelector('.form__initial-guess--bisection-method-1').value);
    let initialGuess2 = parseFloat(document.querySelector('.form__initial-guess--bisection-method-2').value);

    let variable = document.querySelector('.form__variable--bisection-method').value;
    variable = variable ? variable : 'x';

    let precisionValue = parseFloat(document.querySelector('.form__precision--bisection-method').value);
    precisionValue = precisionValue ? precisionValue : 4;

    if (question) {
        document.querySelector('.form__required--bisection-method').style.display = 'none';

        const regex = new RegExp(variable, 'g');

        try {
            math.evaluate(question.replace(regex, initialGuess1));
            if (
                math.evaluate(question.replace(regex, initialGuess1.toString())) *
                    math.evaluate(question.replace(regex, initialGuess2.toString())) >
                0
            )
                return alert('Entered initial guesses do not converge');

            if (precisionValue > 12) return alert('Please set a precision value less than 12');
            document.querySelector('.form__precision--bisection-method').value = precisionValue;

            if (!initialGuess1 && !initialGuess2) {
                initialGuess1 = generateInitialGuess(question, regex);
                initialGuess2 = initialGuess1 + 1;

                document.querySelector('.form__initial-guess--bisection-method-1').value = initialGuess1;
                document.querySelector('.form__initial-guess--bisection-method-2').value = initialGuess2;
            }

            if (
                !document.querySelector('.form__initial-guess--bisection-method-1').value ||
                !document.querySelector('.form__initial-guess--bisection-method-2').value
            )
                return alert('Enter the other initial guess');

            document.querySelector('.form__variable--bisection-method').value = variable;
        } catch (error) {
            return alert(error);
        }

        let serialNumbers = [];
        let initialGuess1Array = [];
        let initialGuess2Array = [];
        let averageArray = [];
        let fuctionValue;
        let functionArray = [];

        initialGuess1Array.push(initialGuess1.toFixed(precisionValue));
        initialGuess2Array.push(initialGuess2.toFixed(precisionValue));

        let average = (initialGuess1 + initialGuess2) / 2;
        averageArray.push(average.toFixed(precisionValue));

        fuctionValue = math.evaluate(question.replace(regex, average.toString()));
        functionArray.push(fuctionValue.toFixed(precisionValue));

        while (initialGuess1.toFixed(precisionValue) != initialGuess2.toFixed(precisionValue)) {
            const flag1 = math.evaluate(question.replace(regex, initialGuess1.toString())) > 0 ? true : false;
            const flag2 = math.evaluate(question.replace(regex, average.toString())) > 0 ? true : false;
            flag1 === flag2 ? (initialGuess1 = average) : (initialGuess2 = average);

            initialGuess1Array.push(initialGuess1.toFixed(precisionValue));
            initialGuess2Array.push(initialGuess2.toFixed(precisionValue));

            average = (initialGuess1 + initialGuess2) / 2;
            averageArray.push(average.toFixed(precisionValue));

            fuctionValue = math.evaluate(question.replace(regex, average.toString()));
            functionArray.push(fuctionValue.toFixed(precisionValue));
        }

        for (let i = 0; i < averageArray.length; i++) {
            serialNumbers.push(i);
        }

        createTable(
            ['S.No', 'A', 'B', 'C', 'F(C)'],
            serialNumbers,
            initialGuess1Array,
            initialGuess2Array,
            averageArray,
            functionArray,
        );

        document.querySelector('.result-text').innerHTML = `Root : ${averageArray[averageArray.length - 1]}`;
    } else {
        document.querySelector('.form__required--bisection-method').style.display = 'block';
        document.querySelector('.form__question--bisection-method').focus();
    }
});

document.querySelector('.form__btn--newton-raphson-method').addEventListener('click', event => {
    event.preventDefault();
    resetTable();

    let question = document.querySelector('.form__question--newton-raphson-method').value;
    let initialGuess = parseFloat(
        document.querySelector('.form__initial-guess--newton-raphson-method').value,
    );
    let derivative = document.querySelector('.form__deriative--newton-raphson-method').value;

    let variable = document.querySelector('.form__variable--newton-raphson-method').value;
    variable = variable ? variable : 'x';

    let precisionValue = parseFloat(document.querySelector('.form__precision--newton-raphson-method').value);
    precisionValue = precisionValue ? precisionValue : 4;

    if (question && (initialGuess || initialGuess === 0)) {
        document.querySelector('.form__required--newton-raphson-method-1').style.display = 'none';
        document.querySelector('.form__required--newton-raphson-method-2').style.display = 'none';

        const regex = new RegExp(variable, 'g');

        derivative = derivative ? derivative : math.derivative(question, variable);
        derivative = derivative.toString();
        document.querySelector('.form__deriative--newton-raphson-method').value = derivative;

        try {
            math.evaluate(question.replace(regex, initialGuess));

            if (math.evaluate(derivative.replace(regex, initialGuess.toString())) === 0)
                return alert(`Incorrect initial guess`);

            if (precisionValue > 12) return alert('Please set a precision value less than 12');
            document.querySelector('.form__precision--newton-raphson-method').value = precisionValue;

            document.querySelector('.form__variable--newton-raphson-method').value = variable;
        } catch (error) {
            return alert(error);
        }

        let serialNumbers = [];
        let initialGuessArray = [];
        let calculatedGuess;
        let functionGuess;
        let functionGuessArray = [];
        let functionDerivative;
        let functionDerivativeArray = [];

        initialGuessArray.push(initialGuess.toFixed(precisionValue));

        functionGuess = math.evaluate(question.replace(regex, initialGuess.toString()));
        functionGuessArray.push(functionGuess.toFixed(precisionValue));

        functionDerivative = math.evaluate(derivative.replace(regex, initialGuess.toString()));
        functionDerivativeArray.push(functionDerivative.toFixed(precisionValue));

        calculatedGuess = initialGuess - functionGuess / functionDerivative;

        while (initialGuess.toFixed(precisionValue) !== calculatedGuess.toFixed(precisionValue)) {
            initialGuess = calculatedGuess;
            initialGuessArray.push(initialGuess.toFixed(precisionValue));

            functionGuess = math.evaluate(question.replace(regex, initialGuess.toString()));
            functionGuessArray.push(functionGuess.toFixed(precisionValue));

            functionDerivative = math.evaluate(derivative.replace(regex, initialGuess.toString()));
            functionDerivativeArray.push(functionDerivative.toFixed(precisionValue));

            calculatedGuess = initialGuess - functionGuess / functionDerivative;
        }
        for (let i = 0; i < initialGuessArray.length; i++) {
            serialNumbers.push(i);
        }

        createTable(
            ['S.No', 'X', 'F(X)', "F'(X)"],
            serialNumbers,
            initialGuessArray,
            functionGuessArray,
            functionDerivativeArray,
        );

        document.querySelector('.result-text').innerHTML = `Root : ${
            initialGuessArray[initialGuessArray.length - 1]
        }`;
    } else {
        document.querySelector('.form__required--newton-raphson-method-1').style.display = 'none';
        document.querySelector('.form__required--newton-raphson-method-2').style.display = 'none';

        if (!question) {
            document.querySelector('.form__required--newton-raphson-method-1').style.display = 'block';
            document.querySelector('.form__question--newton-raphson-method').focus();
            return false;
        }

        if (!document.querySelector('.form__initial-guess--newton-raphson-method').value) {
            document.querySelector('.form__required--newton-raphson-method-2').style.display = 'block';
            document.querySelector('.form__initial-guess--newton-raphson-method').focus();
            return false;
        }
    }
});
