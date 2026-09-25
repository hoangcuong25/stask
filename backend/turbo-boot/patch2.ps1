
$content = Get-Content C:\Users\vancu\OneDrive\Desktop\fis\frontend\dashboard\src\app\dashboard-component\board-list\boad-list-modal\permission-modal\permission.component.html -Raw

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
      </div>
"@

$content = $content -replace "(?s)<div class=`"d-flex flex-column gap-2 mb-4`">.*?(?=\s*</div>\s*</div>\s*<div>\s*<div class=`"fw-bold mb-2`">\{\{ `"Add authorized entity`")", $newBlock

Set-Content C:\Users\vancu\OneDrive\Desktop\fis\frontend\dashboard\src\app\dashboard-component\board-list\boad-list-modal\permission-modal\permission.component.html $content

