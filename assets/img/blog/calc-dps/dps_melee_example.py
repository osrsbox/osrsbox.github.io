def calc_eff_level(level, potion, prayer, style):
    # Calculate effective level
    if prayer == 0:
        # If prayer is 0 (not included) do not use as multiplier
        return level + potion + style + 8
    else:
        # Else, use the normal formula
        return int((level + potion) * prayer) + style + 8

def calc_max_hit(eff_level, eqp_bonus):
    # Calculate max hit
    return int(0.5 + eff_level * (eqp_bonus + 64) / 640)

def calc_max_roll(eff_level, eqp_bonus):
    # Calculate max roll (attack or defence)
    return eff_level * (eqp_bonus + 64)

def calc_hit_chance(max_attack_roll, max_defence_roll):
    # Calculate hit chance
    if max_attack_roll > max_defence_roll:
        return 1 - (max_defence_roll + 2) / (2 * (max_attack_roll + 1))
    else:
        return max_attack_roll / (2 * (max_defence_roll + 1))    

def calc_dps(max_hit, hit_chance, attack_interval):
    # Calculate Damage per Second (DPS)
    return hit_chance * (max_hit / 2) / attack_interval

########## Calculate Max Hit
print(">>> Calculate Max Hit...")
# Strength level
level = 99
# Super strength potion
potion = int(5 + 0.15 * level)
# Piety prayer 23% strength 
prayer = 1.23
# Attack style, 0 for Accurate
style = 0

# Calculate the effective level
eff_level = calc_eff_level(level,
                           potion,
                           prayer,
                           style)

# Equipment bonus taken from Equipment interface
eqp_bonus = 133

max_hit = calc_max_hit(eff_level, eqp_bonus)

print("  > Effective level:   %s" % eff_level)
print("  > Equipment bonus:   %s" % eqp_bonus)
print("  > Maximum hit:       %s" % max_hit)

# Apply bonus, Slayer helm is 7/6 or 1.166666
bonus = 7/6
max_hit = int(max_hit * bonus)

print("  > Maximum hit bonus: %s" % max_hit)

########## Calculate Max Attack Roll
print(">>> Calculate Max Attack Roll...")
# Attack level
level = 97
# Super attack potion
potion = int(5 + 0.15 * level)
# Piety prayer 20% attack 
prayer = 1.20
# Attack style, +3 for Accurate
style = 3

# Calculate the effective level
eff_level = calc_eff_level(level,
                           potion,
                           prayer,
                           style)

# Equipment bonus taken from Equipment interface
eqp_bonus = 136

max_attack_roll = calc_max_roll(eff_level, eqp_bonus)

print("  > Effective level: %s" % eff_level)
print("  > Equipment bonus: %s" % eqp_bonus)
print("  > Max attack roll: %s" % max_attack_roll)

# Apply bonus, Slayer helm is 7/6 or 1.166666
bonus = 7/6
max_attack_roll = int(max_attack_roll * bonus)

print("  > Maximum attack roll bonus: %s" % max_attack_roll)

########## Calculate Max Defence Roll
print(">>> Calculate Max Defence Roll...")
# Defence level
level = 135
# Abyssal demon has no potions!
potion = 0
# Abyssal demon has no prayers
prayer = 0
# Attack style
style = 1

# Calculate the effective level
eff_level = calc_eff_level(level,
                           potion,
                           prayer,
                           style)

# Equipment bonus, Abyssal demon has +20 Slash defence
eqp_bonus = 20

max_defence_roll = calc_max_roll(eff_level, eqp_bonus)

print("  > Effective level:  %s" % eff_level)
print("  > Equipment bonus:  %s" % eqp_bonus)
print("  > Max defence roll: %s" % max_defence_roll)

########## Calculate Hit Chance Against Target
print(">>> Calculate Hit Chance...")
hit_chance = calc_hit_chance(max_attack_roll, max_defence_roll)

print("  > Hit chance: %s" % hit_chance)

########## Calculate Damage per Second (DPS)
print(">>> Calculate Damage per Second...")
# OSRS game tick speed
game_tick = 0.6
# Attack speed, whip is 4 game ticks
attack_speed = 4
# Determine attack interval in seconds (time between attacks)
attack_interval = game_tick * attack_speed

# Calculate the DPS
dps = calc_dps(max_hit, hit_chance, attack_interval)

print("  > DPS: %s" % dps)
