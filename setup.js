// Sample clothing database
const clothingDatabase = {
    shirts: [
        { image: "https://www.madewell.com/images/NT108_NA0054_ld?wid=600&hei=735&fmt=jpeg&fit=crop&qlt=75,1&resMode=bisharp&op_usm=0.5,1,5,0" },
        { image: "https://www.madewell.com/images/NS590_KF8909_ld?wid=600&hei=735&fmt=jpeg&fit=crop&qlt=75,1&resMode=bisharp&op_usm=0.5,1,5,0" },
        // Add more shirts...
    ],
    pants: [
        { image: "https://s7d5.scene7.com/is/image/Anthropologie/4123650590089_029_b" },
        { image: "https://s7d5.scene7.com/is/image/Anthropologie/53208260_037_b2" },
        // Add more pants...
    ],
    shoes: [
        { image: "https://www.madewell.com/images/NR871_BK5229_d1?wid=600&hei=735&fmt=jpeg&fit=crop&qlt=75,1&resMode=bisharp&op_usm=0.5,1,5,0" },
        { image: "https://www.madewell.com/images/NN046_BL9221_ld?wid=600&hei=735&fmt=jpeg&fit=crop&qlt=75,1&resMode=bisharp&op_usm=0.5,1,5,0" },
        // Add more shoes...
    ],
    jackets: [
        { image: "https://s7d5.scene7.com/is/image/Anthropologie/4133380630020_090_b" },
        { image: "https://www.madewell.com/images/NS381_BR6156_ld?wid=600&hei=735&fmt=jpeg&fit=crop&qlt=75,1&resMode=bisharp&op_usm=0.5,1,5,0" },
        // Add more jackets...
    ],
    accessories: [
        { image: "https://s7d5.scene7.com/is/image/Anthropologie/58261918_011_b3" },
        { image: "https://s7d5.scene7.com/is/image/Anthropologie/58045840_005_b" },
        // Add more accessories...
    ],
    dresses: [
        { image: "https://www.madewell.com/images/NS222_RD5662_ld?wid=600&hei=735&fmt=jpeg&fit=crop&qlt=75,1&resMode=bisharp&op_usm=0.5,1,5,0" },
        { image: "https://www.madewell.com/images/NR820_EE5670_ld?wid=600&hei=735&fmt=jpeg&fit=crop&qlt=75,1&resMode=bisharp&op_usm=0.5,1,5,0" },
        // Add more dresses...
    ]
};

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateOutfit() {
    const outfitItems = [];
    const useDress = Math.random() < 0.3; // 30% chance to use a dress

    if (useDress) {
        outfitItems.push({ type: 'dress', item: getRandomItem(clothingDatabase.dresses) });
    } else {
        outfitItems.push({ type: 'shirt', item: getRandomItem(clothingDatabase.shirts) });
        outfitItems.push({ type: 'pants', item: getRandomItem(clothingDatabase.pants) });
    }

    outfitItems.push({ type: 'shoes', item: getRandomItem(clothingDatabase.shoes) });
    
    if (Math.random() < 0.7) { // 70% chance to add a jacket
        outfitItems.push({ type: 'jacket', item: getRandomItem(clothingDatabase.jackets) });
    }
    
    if (Math.random() < 0.8) { // 80% chance to add an accessory
        outfitItems.push({ type: 'accessory', item: getRandomItem(clothingDatabase.accessories) });
    }

    return outfitItems;
}

function replaceItem(outfitItems, clickedType) {
    const typeMap = {
        'shirt': 'shirts',
        'pants': 'pants',
        'shoes': 'shoes',
        'jacket': 'jackets',
        'accessory': 'accessories',
        'dress': 'dresses'
    };

    const newOutfitItems = outfitItems.map(item => {
        if (item.type === clickedType) {
            const databaseKey = typeMap[clickedType] || clickedType + 's';
            return { type: clickedType, item: getRandomItem(clothingDatabase[databaseKey]) };
        }
        return item;
    });
    return newOutfitItems;
}

function displayOutfit() {
    let outfitItems = generateOutfit();

    function updateDisplay() {
        // Create HTML for outfit display
        const outfitHTML = outfitItems.map(({ type, item }) => `
            <div class="outfit-item" data-type="${type}">
                <img src="${item.image}" alt="${type}">
            </div>
        `).join('');

        // Display the result
        document.getElementById('result').innerHTML = `
            <div class="outfit-container">
                ${outfitHTML}
            </div>
        `;

        // Add click event listeners to the new items
        document.querySelectorAll('.outfit-item').forEach(item => {
            item.addEventListener('click', function() {
                const clickedType = this.getAttribute('data-type');
                outfitItems = replaceItem(outfitItems, clickedType);
                updateDisplay();
            });
        });
    }

    updateDisplay();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('generateOutfit').addEventListener('click', displayOutfit);
});
