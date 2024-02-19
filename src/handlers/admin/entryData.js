export const getEntryData = async () => {
    const url = `https://admission.chmsu.edu.ph/admin/api/entries.php?data=all`;
    const response = await fetch(url);
    return await response.json();
}

 