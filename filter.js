  var currentPage = 1; // Initialize current page
  var itemsPerPage = 36; // Set maximum items per page

// Function to count occurrences of each trait
function countOccurrences(arr) {
    return arr.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});
}

// Updated populateFilterOptions function with sorting
function populateFilterOptions() {
    // Extract values for each trait
    const backgrounds = content.map(item => item.background);
    const bases = content.map(item => item.base);
    const bodies = content.map(item => item.body);
    const eyes = content.map(item => item.eye);
    const mouths = content.map(item => item.mouth);
    const heads = content.map(item => item.head);
    // Extract and count for other traits if needed

    // Count occurrences
    const backgroundCounts = countOccurrences(backgrounds);
    const baseCounts = countOccurrences(bases);
    const bodyCounts = countOccurrences(bodies);
    const eyeCounts = countOccurrences(eyes);
    const mouthCounts = countOccurrences(mouths);
    const headCounts = countOccurrences(heads);
    // Count for other traits as needed

    // Sort and Populate Background Filter
    const backgroundSelect = document.getElementById('filter-background');
    Object.entries(backgroundCounts)
        .sort((a, b) => b[1] - a[1]) // Sort by count, descending
        .forEach(([bg, count]) => {
            const optionText = `${bg} (${count})`;
            const option = new Option(optionText, bg);
            backgroundSelect.add(option);
        });

    // Sort and Populate Base Filter
    const baseSelect = document.getElementById('filter-base');
    Object.entries(baseCounts)
        .sort((a, b) => b[1] - a[1]) // Sort by count, descending
        .forEach(([base, count]) => {
            const optionText = `${base} (${count})`;
            const option = new Option(optionText, base);
            baseSelect.add(option);
        });

        const bodySelect = document.getElementById('filter-body');
        Object.entries(bodyCounts)
            .sort((a, b) => b[1] - a[1]) // Sort by count, descending
            .forEach(([body, count]) => {
                const optionText = `${body} (${count})`;
                const option = new Option(optionText, body);
                bodySelect.add(option);
            });

            const eyeSelect = document.getElementById('filter-eye');
            Object.entries(eyeCounts)
                .sort((a, b) => b[1] - a[1]) // Sort by count, descending
                .forEach(([eye, count]) => {
                    const optionText = `${eye} (${count})`;
                    const option = new Option(optionText, eye);
                    eyeSelect.add(option);
                });    


                const mouthSelect = document.getElementById('filter-mouth');
                Object.entries(mouthCounts)
                    .sort((a, b) => b[1] - a[1]) // Sort by count, descending
                    .forEach(([mouth, count]) => {
                        const optionText = `${mouth} (${count})`;
                        const option = new Option(optionText, mouth);
                        mouthSelect.add(option);
                    });

                    const headSelect = document.getElementById('filter-head');
    Object.entries(headCounts)
        .sort((a, b) => b[1] - a[1]) // Sort by count, descending
        .forEach(([head, count]) => {
            const optionText = `${head} (${count})`;
            const option = new Option(optionText, head);
            headSelect.add(option);
        });

    // Repeat for other filters with sorting
}
  

// Function to update the count of unique result items displayed
function updateResultCount(filteredContent) {
    const uniqueCount = filteredContent.length; // Since filteredContent should already contain unique items
    const resultCountElement = document.getElementById('result-count');
    if (!resultCountElement) {
        console.error('Result count element not found.');
        return;
    }
    resultCountElement.textContent = `Displaying ${uniqueCount} unique item(s)`;
}



  // Filter and display content
  function filterAndDisplayContent() {
      const background = document.getElementById('filter-background').value;
      const base = document.getElementById('filter-base').value;
      const body = document.getElementById('filter-body').value;
      const eye = document.getElementById('filter-eye').value;
      const mouth = document.getElementById('filter-mouth').value;
      const head = document.getElementById('filter-head').value;
      // Retrieve values for other filters
  
      const filteredContent = content.filter(item => {
          return (background === '' || item.background === background) &&
                 (base === '' || item.base === base) &&
                 (body === '' || item.body === body) &&
                 (eye === '' || item.eye === eye) &&
                 (mouth === '' || item.mouth === mouth) &&
                 (head === '' || item.head === head);
                 // Add conditions for other filters
      });
  
      displayContent(filteredContent);
      updateResultCount(filteredContent); 
  }
  
  // Display content with pagination
  function displayContent(filteredContent) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedItems = filteredContent.slice(startIndex, endIndex); // Slice the content for pagination
  
      const contentContainer = document.getElementById('content-container');
      contentContainer.innerHTML = ''; // Clear existing content
  
      paginatedItems.forEach(item => {
        const element = document.createElement('div');
        // Add Bootstrap grid classes here for responsive layout
        element.classList.add('content-item', 'col-4', 'col-md-2');
        
        element.innerHTML = `
        <a href="${item.link}" target="_blank" class="content-item-link">
            <div class="content-item-text-wrapper">
                <img src="${item.img || ''}">
                <div class="item-title">Rexxie #${item.number}</div>
            </div>
        </a>
        `;
        
        contentContainer.appendChild(element);
    });
    
  
      // Update pagination controls
      updatePaginationControls(filteredContent.length);
  }
  
  // Update pagination controls
  function updatePaginationControls(totalItems) {
      const totalPages = Math.ceil(totalItems / itemsPerPage);
      document.getElementById('prev-page').disabled = currentPage === 1;
      document.getElementById('next-page').disabled = currentPage === totalPages;
  }
  
  // Event listeners for filters
  document.getElementById('filter-background').addEventListener('change', () => {
      currentPage = 1; // Reset to first page on filter change
      filterAndDisplayContent();
  });
  
  document.getElementById('filter-base').addEventListener('change', () => {
      currentPage = 1; // Reset to first page on filter change
      filterAndDisplayContent();
  });

  document.getElementById('filter-body').addEventListener('change', () => {
    currentPage = 1; // Reset to first page on filter change
    filterAndDisplayContent();
});

  document.getElementById('filter-eye').addEventListener('change', () => {
    currentPage = 1; // Reset to first page on filter change
    filterAndDisplayContent();
});

document.getElementById('filter-mouth').addEventListener('change', () => {
    currentPage = 1; // Reset to first page on filter change
    filterAndDisplayContent();
});

document.getElementById('filter-head').addEventListener('change', () => {
    currentPage = 1; // Reset to first page on filter change
    filterAndDisplayContent();
});
  
  // Event handlers for pagination controls
  document.getElementById('prev-page').addEventListener('click', function() {
      if (currentPage > 1) {
          currentPage--;
          filterAndDisplayContent();
      }
  });
  
  document.getElementById('next-page').addEventListener('click', function() {
      const totalItems = content.filter(item => {
          // Your existing filter conditions here
          return true; // Placeholder, replace with actual filter logic
      }).length;
  
      if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
          currentPage++;
          filterAndDisplayContent();
      }
  });
  
  // Initialize
  populateFilterOptions();
  filterAndDisplayContent();

  // Clear Filter Button =======================================================================================

  function clearFilters() {
    // Reset each filter to its default state
    document.getElementById('filter-background').value = '';
    document.getElementById('filter-base').value = '';
    document.getElementById('filter-body').value = '';
    document.getElementById('filter-eye').value = '';
    document.getElementById('filter-mouth').value = '';
    document.getElementById('filter-head').value = '';
    // Add lines here to reset other filters if you have more

    // Reset to the first page
    currentPage = 1;

    // Re-filter and display content based on the reset filters
    filterAndDisplayContent();
}

document.getElementById('clear-filters-btn').addEventListener('click', clearFilters);

  