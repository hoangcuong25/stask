
$content = Get-Content C:\Users\vancu\OneDrive\Desktop\fis\frontend\dashboard\src\app\dashboard-component\board-list\boad-list-modal\permission-modal\permssion.component.ts -Raw
$content = $content -replace "(?m)^\s*upsertPermission\b", "
  togglePublic(event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.upsertPermission(this.publicPermissionRequest);
    } else {
      this.revokePermission(this.publicPermissionRequest);
    }
  }

  upsertPermission"
Set-Content C:\Users\vancu\OneDrive\Desktop\fis\frontend\dashboard\src\app\dashboard-component\board-list\boad-list-modal\permission-modal\permssion.component.ts $content

