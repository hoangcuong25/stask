
$content = Get-Content C:\Users\vancu\OneDrive\Desktop\fis\frontend\dashboard\src\app\dashboard-component\board-list\boad-list-modal\permission-modal\permission.component.html -Raw
$content = $content -replace "(?s)\s*</div>\s*</div>\s*</div>\s*<div>\s*<div class=`"fw-bold mb-2`">\{\{ `"Add authorized entity`"", "`n      </div>`n    </div>`n    <div>`n      <div class=`"fw-bold mb-2`">{{ `"Add authorized entity`""
Set-Content C:\Users\vancu\OneDrive\Desktop\fis\frontend\dashboard\src\app\dashboard-component\board-list\boad-list-modal\permission-modal\permission.component.html $content

