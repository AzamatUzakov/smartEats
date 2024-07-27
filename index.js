function calculateBJU() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const age = parseFloat(document.getElementById('age').value);
    const goal = document.getElementById('goal').value;
    const workoutsPerWeek = parseInt(document.getElementById('workoutsPerWeek').value);
    const fitnessLevel = document.getElementById('fitnessLevel').value;
    const activityLevel = document.getElementById('activityLevel').value;
    let levelfit = document.getElementById('levelfit')
    let level_p = document.querySelector('.level_p')
    let workout_p = document.querySelector('.workout_p')
    let target_p = document.querySelector('.target_p')
    let height_hum = document.querySelector('#height_hum')
    let weight_hum = document.querySelector('#weight_hum')
    let age_num = document.querySelector('#age_hum')
    let male_hum = document.querySelector('#male_hum')

    let bmr;  // Basal Metabolic Rate
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        male_hum.innerHTML = `<b>М <br></b> Пол`
    } else {
        male_hum.innerHTML = `<b>Ж<br></b> Пол`

        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    let activityFactor;
    if (activityLevel === 'low') {
        activityFactor = 1.2;
        level_p.innerHTML = `<b>Сидячая работа, мало подвижный образ жизни</b>`
    } else if (activityLevel === 'medium') {
        activityFactor = 1.55;
        level_p.innerHTML = `<b>Сидячая работа, среднеактивный образ жизни</b>`

    } else {
        activityFactor = 1.9;
        level_p.innerHTML = `<b>Работа связана с физической нагрузкой, очень активный образ жизни</b>`

    }

    // Adjust activity factor based on workouts per week
    if (workoutsPerWeek >= 5) {
        activityFactor += 0.2;

    } else if (workoutsPerWeek >= 3) {
        activityFactor += 0.1;
    }

    workout_p.innerHTML = `<b>${workoutsPerWeek} в неделю</b>`


    /*    // Adjust BMR based on fitness level
       if (fitnessLevel === 'intermediate') {
           bmr *= 1.1;  // Increase by 10%
       } else if (fitnessLevel === "beginner") { }
       else if (fitnessLevel === 'advanced') {
           bmr *= 1.2;  // Increase by 20%
       }
    */
    let tdee = bmr * activityFactor;  // Total Daily Energy Expenditure

    if (goal === 'maintain') {
        target_p.innerHTML = `<b>Поддерживать свою форму</b>`

    }
    else if (goal === 'lose') {
        tdee -= 500;
        target_p.innerHTML = `<b>Похудеть (убрать жир)</b>`

    } else if (goal === 'gain') {
        tdee += 500;
        target_p.innerHTML = `<b>Набрать мышечную массу</b>`

    }

    const proteins = weight * 1.5;  // grams
    const fats = weight * 0.8;  // grams
    const carbs = (tdee - (proteins * 4 + fats * 9)) / 4;  // grams

    document.getElementById('calories').innerHTML = `<b>${tdee.toFixed(0)}</b><br>Ккал`;
    document.getElementById('proteins').innerHTML = `<b>${proteins.toFixed(0)}</b><br>Белки`;
    document.getElementById('fats').innerHTML = `<b>${fats.toFixed(0)}</b><br>Жиры`;
    document.getElementById('carbs').innerHTML = `<b>${carbs.toFixed(0)}</b><br>Углеводы`;

    document.getElementById('results').style.display = 'block';
    document.getElementById('editForm').style.display = 'none';

    height_hum.innerHTML = `<b>${height} <br></b> Рост`
    weight_hum.innerHTML = `<b>${weight} <br></b>Вес`
    age_num.innerHTML = `<b>${age} <br></b> Рост`
}

function showEditForm() {
    const proteins = parseFloat(document.getElementById('proteins').textContent.split(' ')[1]);
    const fats = parseFloat(document.getElementById('fats').textContent.split(' ')[1]);
    const carbs = parseFloat(document.getElementById('carbs').textContent.split(' ')[1]);

    document.getElementById('editProteins').value = proteins;
    document.getElementById('editFats').value = fats;
    document.getElementById('editCarbs').value = carbs;

    document.getElementById('editForm').style.display = 'block';
}

function saveEditedBJU() {
    const proteins = parseFloat(document.getElementById('editProteins').value);
    const fats = parseFloat(document.getElementById('editFats').value);
    const carbs = parseFloat(document.getElementById('editCarbs').value);

    const tdee = proteins * 4 + fats * 9 + carbs * 4;

    document.getElementById('calories').innerHTML =  `<b>${tdee.toFixed(0)}</b><br>Ккал`;
    document.getElementById('proteins').innerHTML = `<b>${proteins.toFixed(0)}</b><br>Белки`;
    document.getElementById('fats').innerHTML =  `<b>${fats.toFixed(0)}</b><br>Жиры`;
    document.getElementById('carbs').innerHTML = `<b>${carbs.toFixed(0)}</b><br>Углеводы`;

    document.getElementById('editForm').style.display = 'none';
    document.getElementById('results').style.display = 'block';
}
