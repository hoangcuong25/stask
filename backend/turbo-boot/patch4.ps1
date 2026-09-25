
$content = Get-Content C:\Users\vancu\OneDrive\Desktop\fis\frontend\dashboard\src\app\dashboard-component\board-list\boad-list-modal\permission-modal\permission.component.html -Raw
$content = $content -replace "(?s)\s*<label class=`"radio-card`" \[class\.active\]=`"restricted`">.*?</label>", ""
Set-Content C:\Users\vancu\OneDrive\Desktop\fis\frontend\dashboard\src\app\dashboard-component\board-list\boad-list-modal\permission-modal\permission.component.html $content

