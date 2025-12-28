(function() {
    'use strict';
    const emailRegex = /(?:^|[^a-zA-Z0-9._-])([a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+)(?=[^a-zA-Z0-9._-]|$)/gi;
    const mailtoRegex = /mailto:\s*([a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+)/gi;
    function extractEmailsFromText(text) {
        const emails = new Set();
        let match;
        while ((match = emailRegex.exec(text)) !== null) {
            emails.add(match[1].toLowerCase());
        }
        emailRegex.lastIndex = 0;
        while ((match = mailtoRegex.exec(text)) !== null) {
            emails.add(match[1].toLowerCase());
        }
        return Array.from(emails);
    }

    function extractEmailsFromAttributes() {
        const emails = new Set();
        const attributes = ['href', 'data-email', 'data-contact', 'title', 'alt'];
        const allElements = document.querySelectorAll('*');
        
        allElements.forEach(element => {
            attributes.forEach(attr => {
                const value = element.getAttribute(attr);
                if (value) {
                    const found = extractEmailsFromText(value);
                    found.forEach(email => emails.add(email));
                }
            });
        });
        
        return Array.from(emails);
    }

    function extractEmailsFromPageContent() {
        const emails = new Set();
        const pageText = document.body.innerText || document.body.textContent || '';
        const found = extractEmailsFromText(pageText);
        found.forEach(email => emails.add(email));
        return Array.from(emails);
    }

    function extractDomain(email) {
        const domainRegex = /@([a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)+)$/;
        const match = email.match(domainRegex);
        return match ? match[1] : null;
    }

    function groupByDomain(emails) {
        const grouped = {};
        emails.forEach(email => {
            const domain = extractDomain(email);
            if (domain) {
                if (!grouped[domain]) {
                    grouped[domain] = [];
                }
                grouped[domain].push(email);
            }
        });
        return grouped;
    }

    function findAndAnalyzeEmails() {
        console.log('поиск email на странице\n');
        
        const emailsFromText = extractEmailsFromPageContent();
        const emailsFromAttributes = extractEmailsFromAttributes();
        const allEmails = new Set([...emailsFromText, ...emailsFromAttributes]);
        const uniqueEmails = Array.from(allEmails).sort();
        
        const results = {
            total: uniqueEmails.length,
            emails: uniqueEmails,
            byDomain: groupByDomain(uniqueEmails),
            sources: {
                fromText: emailsFromText.length,
                fromAttributes: emailsFromAttributes.length
            }
        };
        
        console.log('результаты \n');
        console.log('всего найдено emailов: ' + results.total);
        console.log('в тексте страницы: ' + results.sources.fromText);
        console.log('в атрибутах элементов: ' + results.sources.fromAttributes + '\n');
        
        if (results.total > 0) {
            console.log('найденные email');
            results.emails.forEach((email, index) => {
                console.log('  ' + (index + 1) + '. ' + email);
            });
            
            console.log('\nгруппировка по доменам:');
            const domains = Object.keys(results.byDomain).sort();
            domains.forEach(domain => {
                console.log('  ' + domain + ': ' + results.byDomain[domain].length + ' emailов');
                results.byDomain[domain].forEach(email => {
                    console.log(email);
                });
            });
        } else {
            console.log('email не найдены на странице.');
        }
        
        return results;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', findAndAnalyzeEmails);
    } else {
        findAndAnalyzeEmails();
    }

    window.findEmails = findAndAnalyzeEmails;
})();

