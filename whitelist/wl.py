# using xlrd 1.2.0 for xlsx support

from xlrd import open_workbook
import json

wb = open_workbook('wlAddresses.xlsx', 'r')
wb_sheet = wb.sheet_by_index(0)

total_count = 0
wallets = []

for x in range(0, wb_sheet.nrows):
    wallet = str(wb_sheet.cell(x, 0).value).strip()
    total_count += 1

    if wallet not in wallets:
        wallets.append(wallet)

jsonWallets = {}
for wallet in wallets:
    jsonWallets[str(wallet)] = "1"

print('Lines in excel sheet: ' + str(total_count))
print('Wallets after removing duplicates: ' + str(len(wallets)))
print(jsonWallets)

# Save jsonWallets to file
with open('output.json', 'w') as f:
    json.dump(jsonWallets, f)
