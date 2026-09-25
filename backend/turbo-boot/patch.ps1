
$content = Get-Content C:\Users\vancu\OneDrive\Desktop\fis\frontend\dashboard\src\app\dashboard-component\board-list\boad-list-modal\permission-modal\permission.component.html -Raw

$startTag = "<div class=`"d-flex flex-column gap-2 mb-4`">"
$endTag = "    </div>`n    <div>`n      <div class=`"fw-bold mb-2`">{{ `"Add authorized entity`" | translate }}</div>"

$startIndex = $content.IndexOf($startTag)
$endIndex = $content.IndexOf($endTag)

if ($startIndex -ge 0 -and $endIndex -gt $startIndex) {
    echo "Found block to replace!"
    
    $newBlock = @"
      <div class="d-flex flex-column gap-2 mb-4">
        <label class="radio-card" [class.active]="mode === 'public'">
          <input
            class="form-check-input"
            type="checkbox"
            [checked]="mode === 'public'"
            (change)="togglePublic(`$event)"
          />
          <span class="radio-ic" [class.on]="mode === 'public'"
            ><flx-icon
              status="primary"
              src="assets/icon/permission/world.svg"
              [width]="24"
              [height]="24"
            ></flx-icon
          ></span>
          <span>
            <span class="d-block fw-semibold text-body-emphasis">{{
              "Public access" | translate
            }}</span>
            <span class="d-block small text-secondary">{{
              "Everyone who is logged in can view this dashboard" | translate
            }}</span>
          </span>
        </label>
"@
    
    $part1 = $content.Substring(0, $startIndex)
    $part2 = $content.Substring($endIndex)
    
    $finalContent = $part1 + $newBlock + "`n" + $part2
    Set-Content C:\Users\vancu\OneDrive\Desktop\fis\frontend\dashboard\src\app\dashboard-component\board-list\boad-list-modal\permission-modal\permission.component.html $finalContent
} else {
    echo "Could not find tags!"
}

