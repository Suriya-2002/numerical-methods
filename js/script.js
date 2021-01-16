const navigationToggler = document.querySelector('.navigation__lines');
const navigationBackground = document.querySelector('.navigation__background');
const navigationLink = document.querySelectorAll('.navigation__link');

let methodLink = document.querySelectorAll('.method__link');
methodLink = [...methodLink, ...navigationLink];

const navigationActive = () => {
    if (screen.width > 1200) {
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
    } else {
        gsap.to('.navigation__background', {
            width: '500rem',
            height: '500rem',
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
            x: `${screen.width / 2}`,
            opacity: 1,
            pointerEvents: 'all',
            stagger: 0.1,
            duration: 0.5,
        });
    }
};

const navigationInactive = () => {
    if (screen.width > 1200) {
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
    } else {
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
            x: '100rem',
            opacity: 0,
            pointerEvents: 'none',
            stagger: -0.1,
            duration: 0.5,
        });
    }
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
    resetTable();
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

document.querySelector('.form__btn--secant-method').addEventListener('click', event => {
    event.preventDefault();
    resetTable();

    let question = document.querySelector('.form__question--secant-method').value;
    let initialGuess1 = parseFloat(document.querySelector('.form__initial-guess--secant-method-1').value);
    let initialGuess2 = parseFloat(document.querySelector('.form__initial-guess--secant-method-2').value);

    let variable = document.querySelector('.form__variable--secant-method').value;
    variable = variable ? variable : 'x';

    let precisionValue = parseFloat(document.querySelector('.form__precision--secant-method').value);
    precisionValue = precisionValue ? precisionValue : 4;

    if (question) {
        document.querySelector('.form__required--secant-method').style.display = 'none';

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
            document.querySelector('.form__precision--secant-method').value = precisionValue;

            if (!initialGuess1 && !initialGuess2) {
                initialGuess1 = generateInitialGuess(question, regex);
                initialGuess2 = initialGuess1 + 1;

                document.querySelector('.form__initial-guess--secant-method-1').value = initialGuess1;
                document.querySelector('.form__initial-guess--secant-method-2').value = initialGuess2;
            }

            if (
                !document.querySelector('.form__initial-guess--secant-method-1').value ||
                !document.querySelector('.form__initial-guess--secant-method-2').value
            )
                return alert('Enter the other initial guess');

            document.querySelector('.form__variable--secant-method').value = variable;
        } catch (error) {
            return alert(error);
        }

        let serialNumbers = [];
        let calculatedGuess;
        let function1;
        let function2;
        let function3;
        let functionArray = [];
        let calculatedGuessArray = [];

        function1 = math.evaluate(question.replace(regex, initialGuess1.toString()));
        function2 = math.evaluate(question.replace(regex, initialGuess2.toString()));

        functionArray.push(function1.toFixed(precisionValue));
        functionArray.push(function2.toFixed(precisionValue));

        calculatedGuessArray.push(initialGuess1.toFixed(precisionValue));
        calculatedGuessArray.push(initialGuess2.toFixed(precisionValue));

        calculatedGuess =
            initialGuess2 - function2 * ((initialGuess2 - initialGuess1) / (function2 - function1));
        calculatedGuessArray.push(calculatedGuess.toFixed(precisionValue));

        function3 = math.evaluate(question.replace(regex, calculatedGuess.toString()));
        functionArray.push(function3.toFixed(precisionValue));

        while (initialGuess2.toFixed(precisionValue) !== calculatedGuess.toFixed(precisionValue)) {
            initialGuess1 = initialGuess2;
            function1 = math.evaluate(question.replace(regex, initialGuess1.toString()));

            initialGuess2 = calculatedGuess;
            function2 = math.evaluate(question.replace(regex, initialGuess2.toString()));

            calculatedGuess =
                initialGuess2 - function2 * ((initialGuess2 - initialGuess1) / (function2 - function1));
            calculatedGuessArray.push(calculatedGuess.toFixed(precisionValue));

            function3 = math.evaluate(question.replace(regex, calculatedGuess.toString()));
            functionArray.push(function3.toFixed(precisionValue));
        }
        for (let i = 0; i < calculatedGuessArray.length; i++) serialNumbers.push(i);

        createTable(['S.No', 'X', 'F(X)'], serialNumbers, calculatedGuessArray, functionArray);

        document.querySelector('.result-text').innerHTML = `Root : ${
            calculatedGuessArray[calculatedGuessArray.length - 1]
        }`;
    } else {
        document.querySelector('.form__required--secant-method').style.display = 'block';
        document.querySelector('.form__question--secant-method').focus();
    }
});

document.querySelector('.form__btn--regula-falsi-method').addEventListener('click', event => {
    event.preventDefault();
    resetTable();

    let question = document.querySelector('.form__question--regula-falsi-method').value;
    let initialGuess1 = parseFloat(
        document.querySelector('.form__initial-guess--regula-falsi-method-1').value,
    );
    let initialGuess2 = parseFloat(
        document.querySelector('.form__initial-guess--regula-falsi-method-2').value,
    );

    let variable = document.querySelector('.form__variable--regula-falsi-method').value;
    variable = variable ? variable : 'x';

    let precisionValue = parseFloat(document.querySelector('.form__precision--regula-falsi-method').value);
    precisionValue = precisionValue ? precisionValue : 4;

    if (question) {
        document.querySelector('.form__required--regula-falsi-method').style.display = 'none';

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
            document.querySelector('.form__precision--regula-falsi-method').value = precisionValue;

            if (!initialGuess1 && !initialGuess2) {
                initialGuess1 = generateInitialGuess(question, regex);
                initialGuess2 = initialGuess1 + 1;

                document.querySelector('.form__initial-guess--regula-falsi-method-1').value = initialGuess1;
                document.querySelector('.form__initial-guess--regula-falsi-method-2').value = initialGuess2;
            }

            if (
                !document.querySelector('.form__initial-guess--regula-falsi-method-1').value ||
                !document.querySelector('.form__initial-guess--regula-falsi-method-2').value
            )
                return alert('Enter the other initial guess');

            document.querySelector('.form__variable--regula-falsi-method').value = variable;
        } catch (error) {
            return alert(error);
        }

        let serialNumbers = [];
        let calculatedGuess;
        let function1;
        let function2;
        let function3;
        let functionArray = [];
        let calculatedGuessArray = [];

        function1 = math.evaluate(question.replace(regex, initialGuess1.toString()));
        function2 = math.evaluate(question.replace(regex, initialGuess2.toString()));

        functionArray.push(function1.toFixed(precisionValue));
        functionArray.push(function2.toFixed(precisionValue));

        calculatedGuessArray.push(initialGuess1.toFixed(precisionValue));
        calculatedGuessArray.push(initialGuess2.toFixed(precisionValue));

        calculatedGuess = (initialGuess1 * function2 - initialGuess2 * function1) / (function2 - function1);

        function3 = math.evaluate(question.replace(regex, calculatedGuess.toString()));

        while (Math.abs(parseFloat(function3.toFixed(precisionValue))) > Math.pow(10, -1 * precisionValue)) {
            calculatedGuess =
                (initialGuess1 * function2 - initialGuess2 * function1) / (function2 - function1);
            calculatedGuessArray.push(calculatedGuess.toFixed(precisionValue));

            function3 * function1 < 0 ? (initialGuess2 = calculatedGuess) : (initialGuess1 = calculatedGuess);

            function1 = math.evaluate(question.replace(regex, initialGuess1.toString()));
            function2 = math.evaluate(question.replace(regex, initialGuess2.toString()));

            function3 = math.evaluate(question.replace(regex, calculatedGuess.toString()));
            functionArray.push(function3.toFixed(precisionValue));
        }

        for (let i = 0; i < calculatedGuessArray.length; i++) serialNumbers.push(i);

        createTable(['S.No', 'X', 'F(X)'], serialNumbers, calculatedGuessArray, functionArray);

        document.querySelector('.result-text').innerHTML = `Root : ${
            calculatedGuessArray[calculatedGuessArray.length - 1]
        }`;
    } else {
        document.querySelector('.form__required--regula-falsi-method').style.display = 'block';
        document.querySelector('.form__question--regula-falsi-method').focus();
    }
});

document.querySelector('.form__btn--fixed-point-method').addEventListener('click', event => {
    event.preventDefault();
    resetTable();

    let question = document.querySelector('.form__question--fixed-point-method').value;
    let initialGuess = parseFloat(document.querySelector('.form__initial-guess--fixed-point-method').value);

    let variable = document.querySelector('.form__variable--fixed-point-method').value;
    variable = variable ? variable : 'x';

    let precisionValue = parseFloat(document.querySelector('.form__precision--fixed-point-method').value);
    precisionValue = precisionValue ? precisionValue : 4;

    if (question && (initialGuess || initialGuess === 0)) {
        document.querySelector('.form__required--fixed-point-method-1').style.display = 'none';
        document.querySelector('.form__required--fixed-point-method-2').style.display = 'none';

        const regex = new RegExp(variable, 'g');

        try {
            math.evaluate(question.replace(regex, initialGuess));

            if (precisionValue > 12) return alert('Please set a precision value less than 12');
            document.querySelector('.form__precision--fixed-point-method').value = precisionValue;

            const convergeCondition = Math.abs(
                math.evaluate(
                    math.derivative(question, variable).toString().replace(regex, initialGuess.toString()),
                ),
            );

            if (convergeCondition > 1 || (!convergeCondition && convergeCondition !== 0)) {
                return alert('Entered initial guess may not converge');
            }

            document.querySelector('.form__variable--fixed-point-method').value = variable;
        } catch (error) {
            return alert(error);
        }

        let serialNumbers = [];
        let calculatedGuess;
        let functionValue;
        let functionArray = [];
        let calculatedGuessArray = [];

        calculatedGuess = initialGuess;
        calculatedGuessArray.push(calculatedGuess.toFixed(precisionValue));

        functionValue = math.evaluate(question.replace(regex, initialGuess.toString()));
        functionArray.push(functionValue.toFixed(precisionValue));

        while (
            Math.abs(
                parseFloat(functionValue.toFixed(precisionValue)) -
                    parseFloat(calculatedGuess.toFixed(precisionValue)),
            ) > Math.pow(10, -1 * precisionValue)
        ) {
            calculatedGuess = functionValue;
            calculatedGuessArray.push(calculatedGuess.toFixed(precisionValue));

            functionValue = math.evaluate(question.replace(regex, calculatedGuess.toString()));
            functionArray.push(functionValue.toFixed(precisionValue));
        }

        for (let i = 0; i < calculatedGuessArray.length; i++) serialNumbers.push(i);

        createTable(['S.No', 'X', 'F(X)'], serialNumbers, calculatedGuessArray, functionArray);

        document.querySelector('.result-text').innerHTML = `Root : ${
            calculatedGuessArray[calculatedGuessArray.length - 1]
        }`;
    } else {
        document.querySelector('.form__required--fixed-point-method-1').style.display = 'none';
        document.querySelector('.form__required--fixed-point-method-2').style.display = 'none';

        if (!question) {
            document.querySelector('.form__required--fixed-point-method-1').style.display = 'block';
            document.querySelector('.form__question--fixed-point-method').focus();
            return false;
        }

        if (!document.querySelector('.form__initial-guess--fixed-point-method').value) {
            document.querySelector('.form__required--fixed-point-method-2').style.display = 'block';
            document.querySelector('.form__initial-guess--fixed-point-method').focus();
            return false;
        }
    }
});

document.querySelector('.interpolation__btn--add').addEventListener('click', event => {
    event.preventDefault();

    const cell = `<div class="form__row"><input class="form__x-value form__x-value--interpolation" type="number" min="1" max="8" placeholder="X" /> <input class="form__y-value form__y-value--interpolation" type="number" placeholder="Y" /> <a onclick="removeInput(this)" class="btn btn--delete"> <i class="icon--delete fas fa-trash-alt"></i> </a> </div>`;

    document.querySelector('.interpolation__btn--add').insertAdjacentHTML('beforebegin', cell);
});
document.querySelector('.divided-difference__btn--add').addEventListener('click', event => {
    event.preventDefault();

    const cell = `<div class="form__row"><input class="form__x-value form__x-value--divided-difference" type="number" min="1" max="8" placeholder="X" /> <input class="form__y-value form__y-value--divided-difference" type="number" placeholder="Y" /> <a onclick="removeInput(this)" class="btn btn--delete"> <i class="icon--delete fas fa-trash-alt"></i> </a> </div>`;

    document.querySelector('.divided-difference__btn--add').insertAdjacentHTML('beforebegin', cell);
});

const calculateInterpolationInputs = [
    document.querySelector('.form__find-x--interpolation'),
    document.querySelector('.form__precision--interpolation'),
    document.querySelector('.form__variable--interpolation'),
];
const calculateDividedDifferenceInputs = [
    document.querySelector('.form__find-x--divided-difference'),
    document.querySelector('.form__precision--divided-difference'),
    document.querySelector('.form__variable--divided-difference'),
];

calculateInterpolationInputs.forEach(input => {
    input.addEventListener('keydown', event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.querySelector('.form__btn--interpolation').click();
        }
    });
});
calculateDividedDifferenceInputs.forEach(input => {
    input.addEventListener('keydown', event => {
        if (event.keyCode === 13) {
            event.preventDefault();
            document.querySelector('.form__btn--divided-difference').click();
        }
    });
});

const dropdownOptionTitle = document.querySelectorAll('.dropdown__option--title');
const dropdownSelectedTitle = document.querySelector('.dropdown__text--title');
const paragraphInterpolation = [
    document.querySelector('.paragraph--forward'),
    document.querySelector('.paragraph--backward'),
    document.querySelector('.paragraph--lagrange'),
];

paragraphInterpolation[1].style.display = 'none';
paragraphInterpolation[2].style.display = 'none';

dropdownOptionTitle.forEach(option => {
    option.addEventListener('click', () => {
        resetTable();
        paragraphInterpolation.forEach(para => {
            para.style.display = 'none';
        });
        dropdownSelectedTitle.innerHTML =
            option.textContent + ' <i class="fas fa-caret-down margin-left--small"></i>';

        if (dropdownSelectedTitle.textContent === 'Forward ')
            paragraphInterpolation[0].style.display = 'block';
        else if (dropdownSelectedTitle.textContent === 'Backward ')
            paragraphInterpolation[1].style.display = 'block';
        else if (dropdownSelectedTitle.textContent === 'Lagrange ')
            paragraphInterpolation[2].style.display = 'block';
    });
});

document.querySelector('.form__variable--interpolation').classList.add('form__input--disabled');
document.querySelector('.form__variable--divided-difference').classList.add('form__input--disabled');

const findXValueInterpolation = () => {
    document.querySelector('.form__find-x--interpolation').classList.remove('form__input--disabled');
    document.querySelector('.form__variable--interpolation').classList.add('form__input--disabled');
};
const findXValueDividedDifference = () => {
    document.querySelector('.form__find-x--divided-difference').classList.remove('form__input--disabled');
    document.querySelector('.form__variable--divided-difference').classList.add('form__input--disabled');
};

const findEquationInterpolation = () => {
    document.querySelector('.form__find-x--interpolation').classList.add('form__input--disabled');
    document.querySelector('.form__variable--interpolation').classList.remove('form__input--disabled');
};
const findEquationDividedDifference = () => {
    document.querySelector('.form__find-x--divided-difference').classList.add('form__input--disabled');
    document.querySelector('.form__variable--divided-difference').classList.remove('form__input--disabled');
};

const dropdownOptionsInterpolation = document.querySelectorAll('.dropdown__option--interpolation');
const dropdownSelectedInterpolation = document.querySelector('.dropdown__text--interpolation');
const dropdownOptionsDividedDifference = document.querySelectorAll('.dropdown__option--divided-difference');
const dropdownSelectedDividedDifference = document.querySelector('.dropdown__text--divided-difference');

const dropdownInterpolation = document.querySelector('.dropdown__text--interpolation');
const dropdownDividedDifference = document.querySelector('.dropdown__text--divided-difference');

dropdownOptionsInterpolation.forEach(option => {
    option.addEventListener('click', () => {
        dropdownInterpolation.setAttribute('data-dropdown', option.getAttribute('data-option'));
        dropdownSelectedInterpolation.innerHTML = option.innerHTML + '<i class="fas fa-caret-down"></i>';
        if (option.getAttribute('data-option') === 'find-x') findXValueInterpolation();
        else findEquationInterpolation();
    });
});
dropdownOptionsDividedDifference.forEach(option => {
    option.addEventListener('click', () => {
        dropdownDividedDifference.setAttribute('data-dropdown', option.getAttribute('data-option'));
        dropdownSelectedDividedDifference.innerHTML = option.innerHTML + '<i class="fas fa-caret-down"></i>';
        if (option.getAttribute('data-option') === 'find-x') findXValueDividedDifference();
        else findEquationDividedDifference();
    });
});

const tableHead = (size, method, type = 'F') => {
    const head = ['X', 'Y'];
    if (method === 'I') {
        let symbol;
        if (type === 'F') symbol = 'Δ';
        else if (type === 'B') symbol = '∇';

        for (let i = 1; i < size; i++) {
            if (i === 1) head.push(`${symbol}Y`);
            else head.push(`${symbol}<sup>${i}</sup>Y`);
        }
    } else if (method === 'D') for (let i = 1; i < size; i++) head.push(i);
    return head;
};

const tableValues = (inputX, inputY, method, precisionValue) => {
    const size = inputX.length;
    let output = [];
    for (let i = 0; i < 2 * size - 1; i++) output[i] = [];

    let counter = 0;
    for (let i = 0; i < 2 * size - 1; i++) {
        for (let j = 0; j < size + 1; j++) {
            output[i][j] = '&nbsp;';
        }
    }

    for (let i = 0, k = 0; i < 2 * size - 1, k < size; i = i + 2, k++) {
        output[i][0] = inputX[k];
        output[i][1] = inputY[k];
    }

    if (method === 'I')
        for (let j = 2; j < size + 1; j++) {
            for (let i = 1; i < 2 * size - 1; i = i + 2) {
                if (
                    i + counter + 1 < 2 * size - 1 &&
                    (output[i + counter + 1][j - 1] - output[i + counter - 1][j - 1] ||
                        output[i + counter + 1][j - 1] - output[i + counter - 1][j - 1] === 0)
                ) {
                    output[i + counter][j] = parseFloat(
                        (output[i + counter + 1][j - 1] - output[i + counter - 1][j - 1]).toFixed(
                            precisionValue,
                        ),
                    );
                }
            }
            counter++;
        }
    else if (method === 'D')
        for (let j = 2, k = 1; j < size + 1, k < size; j++, k++) {
            for (let i = 1, l = 0; i < 2 * size - 1, l < size - k; i = i + 2, l++) {
                if (
                    i + counter + 1 < 2 * size - 1 &&
                    (output[i + counter + 1][j - 1] - output[i + counter - 1][j - 1] ||
                        output[i + counter + 1][j - 1] - output[i + counter - 1][j - 1] === 0)
                ) {
                    output[i + counter][j] = parseFloat(
                        (
                            (output[i + counter - 1][j - 1] - output[i + counter + 1][j - 1]) /
                            (inputX[l] - inputX[k + l])
                        ).toFixed(precisionValue),
                    );
                }
            }
            counter++;
        }

    return output;
};

document.querySelector('.form__btn--interpolation').addEventListener('click', event => {
    event.preventDefault();
    resetTable();

    let type;
    if (dropdownSelectedTitle.textContent === 'Forward ') {
        type = 'F';
    } else if (dropdownSelectedTitle.textContent === 'Backward ') {
        type = 'B';
    } else if (dropdownSelectedTitle.textContent === 'Lagrange ') {
        type = 'L';
    }

    const questionX = document.querySelectorAll('.form__x-value--interpolation');
    const questionY = document.querySelectorAll('.form__y-value--interpolation');
    const findX = parseFloat(document.querySelector('.form__find-x--interpolation').value);

    let variable = document.querySelector('.form__variable--interpolation').value;
    variable = variable ? variable : 'x';

    let precisionValue = parseFloat(document.querySelector('.form__precision--interpolation').value);
    precisionValue = precisionValue ? precisionValue : 4;

    const inputX = [];
    const inputY = [];

    try {
        if (precisionValue > 12) return alert('Please set a precision value less than 12');
        document.querySelector('.form__precision--interpolation').value = precisionValue;

        document.querySelector('.form__variable--interpolation').value = variable;

        for (let i = 0; i < questionX.length; i++) {
            if (questionX[i].value && questionY[i].value) {
                inputX[i] = parseFloat(questionX[i].value);
                inputY[i] = parseFloat(questionY[i].value);
            } else {
                const error = `<small style="display: block;" class="form__error form__error--interpolation">* Don't leave empty or half filled blanks</small>`;

                if (!questionY[i].value) questionY[i].focus();
                if (!questionX[i].value) questionX[i].focus();

                if (!document.querySelector('.form__error'))
                    return document
                        .querySelector('.interpolation__btn--add')
                        .insertAdjacentHTML('afterend', error);

                return false;
            }
        }

        if (document.querySelector('.form__error')) document.querySelector('.form__error').remove();
        document.querySelector('.form__required--interpolation').style.display = 'none';
        if (dropdownInterpolation.getAttribute('data-dropdown') === 'find-x') {
            if (!findX && findX !== 0) {
                document.querySelector('.form__find-x--interpolation').focus();
                return (document.querySelector('.form__required--interpolation').style.display = 'block');
            }
        }
    } catch (error) {
        return alert(error);
    }

    const size = inputX.length;

    if (type === 'F' || type === 'B') {
        const difference = inputX[1] - inputX[0];
        for (let i = 0; i < size - 1; i++)
            if (inputX[i + 1] - inputX[i] !== difference) {
                const error = `<small style="display: block;" class="form__error form__error--interpolation">Entered X values do not have a common difference</small>`;
                return document
                    .querySelector('.interpolation__btn--add')
                    .insertAdjacentHTML('afterend', error);
            }
    }

    const interpolationResult = (output, type) => {
        let yValue;
        let equation;

        if (dropdownInterpolation.getAttribute('data-dropdown') === 'find-x') {
            const calc = (formula, n, type) => {
                let temp = formula;
                if (type === 'F') {
                    for (let i = 1; i < n; i++) {
                        temp = temp * (formula - i);
                    }
                } else if (type === 'B') {
                    for (let i = 1; i < n; i++) {
                        temp = temp * (formula + i);
                    }
                }
                return temp;
            };

            if (type === 'F') {
                yValue = inputY[0];
                let formula = (findX - inputX[0]) / (inputX[1] - inputX[0]);
                for (let i = 1; i < size; i++) {
                    yValue += (calc(formula, i, type) * output[i][i + 1]) / math.factorial(i);
                }
            } else if (type === 'B') {
                yValue = inputY[size - 1];
                let formula = (findX - inputX[size - 1]) / (inputX[1] - inputX[0]);
                for (let i = 1; i < size; i++) {
                    yValue +=
                        (calc(formula, i, type) * output[output.length - i - 1][i + 1]) / math.factorial(i);
                }
            }

            document.querySelector('.result-text').innerHTML = `Y value : ${yValue.toFixed(precisionValue)}`;
        } else if (dropdownInterpolation.getAttribute('data-dropdown') === 'equation') {
            const equationCalc = (equationFormula, n, type) => {
                let temp = equationFormula;
                if (type === 'F') {
                    for (let i = 1; i < n; i++) temp = `${temp} * (${equationFormula} - ${i})`;
                } else if (type === 'B') {
                    for (let i = 1; i < n; i++) temp = `${temp} * (${equationFormula} + ${i})`;
                }
                return temp;
            };

            if (type === 'F') {
                equation = `${inputY[0]}`;
                let equationFormula = `(${variable} - ${inputX[0]}) / ${inputX[1] - inputX[0]}`;
                for (let i = 1; i < size; i++) {
                    equation += ` + ${equationCalc(equationFormula, i, type)} * ${
                        output[i][i + 1] / math.factorial(i)
                    }`;
                }
            } else if (type === 'B') {
                equation = `${inputY[size - 1]}`;
                let equationFormula = `(${variable} - ${inputX[size - 1]}) / ${inputX[1] - inputX[0]}`;
                for (let i = 1; i < size; i++) {
                    equation += ` + ${equationCalc(equationFormula, i, type)} * ${
                        output[output.length - i - 1][i + 1] / math.factorial(i)
                    }`;
                }
            }

            document.querySelector('.result-text').innerHTML = `Equation : &nbsp; ${math
                .rationalize(math.simplify(equation))
                .toString()}`;
        }
    };

    const calculateLagrangeInterpolation = () => {
        if (dropdownInterpolation.getAttribute('data-dropdown') === 'find-x') {
            let yValue = 0;
            for (let i = 0; i < size; i++) {
                temp = 1;

                for (let j = 0; j < size; j++) {
                    if (i !== j) {
                        temp *= (findX - inputX[j]) / (inputX[i] - inputX[j]);
                    }
                }

                yValue += temp * inputY[i];
            }
            document.querySelector('.result-text').style.display = 'flex';
            document.querySelector('.result-text').innerHTML = `Y value : ${yValue.toFixed(precisionValue)}`;
        } else if (dropdownInterpolation.getAttribute('data-dropdown') === 'equation') {
            let equation = '0';
            for (let i = 0; i < size; i++) {
                temp = '1';

                for (let j = 0; j < size; j++) {
                    if (i !== j) {
                        temp = `${temp} * (${variable} - ${inputX[j]}) / ${inputX[i] - inputX[j]}`;
                    }
                }

                equation = `${equation} + ${temp} * ${inputY[i]}`;
            }
            document.querySelector('.result-text').style.display = 'flex';
            document.querySelector('.result-text').innerHTML = `Equation : ${math
                .rationalize(math.simplify(equation))
                .toString()}`;
        }
    };

    if (type === 'F' || type === 'B') {
        const output = tableValues(inputX, inputY, 'I', precisionValue);

        const finalOutput = [];
        for (let i = 0; i < output[0].length; i++) {
            const temp = [];
            for (let j = 0; j < output.length; j++) {
                temp[j] = output[j][i];
            }
            finalOutput[i] = temp;
        }

        const headElements = tableHead(size, 'I', type);
        createTable(headElements, ...finalOutput);
        interpolationResult(output, type);
    } else if (type === 'L') {
        calculateLagrangeInterpolation();
    }
});

document.querySelector('.form__btn--divided-difference').addEventListener('click', event => {
    event.preventDefault();
    resetTable();

    const questionX = document.querySelectorAll('.form__x-value--divided-difference');
    const questionY = document.querySelectorAll('.form__y-value--divided-difference');
    const findX = parseFloat(document.querySelector('.form__find-x--divided-difference').value);

    let variable = document.querySelector('.form__variable--divided-difference').value;
    variable = variable ? variable : 'x';

    let precisionValue = parseFloat(document.querySelector('.form__precision--divided-difference').value);
    precisionValue = precisionValue ? precisionValue : 4;

    const inputX = [];
    const inputY = [];

    try {
        if (precisionValue > 12) return alert('Please set a precision value less than 12');
        document.querySelector('.form__precision--divided-difference').value = precisionValue;

        document.querySelector('.form__variable--divided-difference').value = variable;

        for (let i = 0; i < questionX.length; i++) {
            if (questionX[i].value && questionY[i].value) {
                inputX[i] = parseFloat(questionX[i].value);
                inputY[i] = parseFloat(questionY[i].value);
            } else {
                const error = `<small style="display: block;" class="form__error form__error--divided-difference">* Don't leave empty or half filled blanks</small>`;

                if (!questionY[i].value) questionY[i].focus();
                if (!questionX[i].value) questionX[i].focus();

                if (!document.querySelector('.form__error'))
                    return document
                        .querySelector('.divided-difference__btn--add')
                        .insertAdjacentHTML('afterend', error);
                return false;
            }
        }

        if (document.querySelector('.form__error')) document.querySelector('.form__error').remove();
        document.querySelector('.form__required--divided-difference').style.display = 'none';
        if (dropdownDividedDifference.getAttribute('data-dropdown') === 'find-x') {
            if (!findX && findX !== 0) {
                document.querySelector('.form__find-x--divided-difference').focus();
                return (document.querySelector('.form__required--divided-difference').style.display =
                    'block');
            }
        }
    } catch (error) {
        return alert(error);
    }

    const size = inputX.length;

    const DividedDifferenceResult = output => {
        let yValue;
        let equation;

        if (dropdownDividedDifference.getAttribute('data-dropdown') === 'find-x') {
            const calc = i => {
                let temp = 1;
                for (let j = 0; j < i; j++) temp = temp * (findX - inputX[j]);
                return temp;
            };

            yValue = inputY[0];
            for (let i = 1; i < size; i++) {
                yValue += calc(i) * output[i][i + 1];
            }

            document.querySelector('.result-text').innerHTML = `Y value : ${yValue.toFixed(precisionValue)}`;
        } else if (dropdownDividedDifference.getAttribute('data-dropdown') === 'equation') {
            const equationCalc = i => {
                let temp = `1`;
                for (let j = 0; j < i; j++) temp = `${temp} * (${variable} - ${inputX[j]})`;
                return temp;
            };

            equation = `${inputY[0]}`;
            for (let i = 1; i < size; i++) {
                equation += ` + ${equationCalc(i)} * ${output[i][i + 1]}`;
            }

            document.querySelector('.result-text').innerHTML = `Equation : &nbsp; ${math
                .rationalize(math.simplify(equation))
                .toString()}`;
        }
    };

    const output = tableValues(inputX, inputY, 'D', precisionValue);

    const finalOutput = [];
    for (let i = 0; i < output[0].length; i++) {
        const temp = [];
        for (let j = 0; j < output.length; j++) {
            temp[j] = output[j][i];
        }
        finalOutput[i] = temp;
    }

    const headElements = tableHead(size, 'D');
    createTable(headElements, ...finalOutput);
    DividedDifferenceResult(output);
});
