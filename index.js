import reddit from './redditAPI'

const searcForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

//Form Event Listener
searcForm.addEventListener('submit', e => {
    //Get search term 
    const searchTerm = searchInput.value;
    
    //Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    
    //Get limit
    const searchLimit = document.getElementById('limit').value;

    //CheckInput
    if(searchTerm === ''){
        showMessage('Please add a search term', 'alert-danger');
    }

    //Clear input
    searchInput.value = '';

    //Search Reddit
    reddit.search(searchTerm, searchLimit, sortBy)
        .then(results => {
            let output = '<div class="card-columns">';
                results.forEach(post => {
                    //Check for post image
                    const image = post.preview ? post.preview.images[0]
                        .source.url : 'https://d.ibtimes.co.uk/en/full/1485970/reddit-logo.jpg?w=674';

                    output += `
                    <div class="card" style="width: 18rem;">
                        <img src="${image}" class="card-img-top" alt="Cars image cap">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${truncateText(post.selftext, 100)}</p>
                            <a href="${post.url}" target="_blank" class="btn btn-primary">Read More</a>
                            <hr>
                                <span class="badge badge-secondary">
                                    Subreddit: ${post.subreddit}
                                </span>
                                <span class="badge badge-dark">
                                    Score: ${post.score}
                                </span>
                            </hr>
                         </div>
                    </div>
                    `
                });
            output += '</div>'
            document.getElementById('results').innerHTML = output;
        });

    e.preventDefault();
})

// Show Message Function
function showMessage(message, className){
    //Create div 
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add message text
    div.appendChild(document.createTextNode(message));
    //Get the parent container
    const searchCotainer = document.getElementById('search-container');
    //Get search
    const search = document.getElementById('search');

    //Insert message
    searchCotainer.insertBefore(div, search);

    //Timeout alert
    setTimeout(() => document.querySelector('.alert').remove(),
        3000);
}

//Truncate Text
function truncateText(text, textLimit){
    const shortened = text.indexOf(' ', textLimit);
    if(shortened == -1) return text;

    return text.substring(0, shortened);
}