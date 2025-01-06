piece_bit_size = 4
empty_const = 0x0
pawn_const = 0x1
bishop_const = 0x2
knight_const = 0x3
rook_const = 0x4
queen_const = 0x5
king_const = 0x6
type_mask_const = 0x7
color_const = 0x8

def piece_at_position(game_state: int, pos: int) -> int:
    return (game_state >> (pos * piece_bit_size)) & 0xF




def pieceUnderAttack(game_state: int, pos: int):
    curr_piece = (game_state >> (pos * piece_bit_size)) & 0xf

    enemy_pawn = pawn_const | (0x0 if (curr_piece & color_const) > 0 else color_const)
    enemy_bishop = bishop_const | (0x0 if (curr_piece & color_const) > 0 else color_const)
    enemy_knight = knight_const | (0x0 if (curr_piece & color_const) > 0 else color_const)
    enemy_rook = rook_const | (0x0 if (curr_piece & color_const) > 0 else color_const)
    enemy_queen = queen_const | (0x0 if (curr_piece & color_const) > 0 else color_const)
    enemy_king = king_const | (0x0 if (curr_piece & color_const) > 0 else color_const)

    curr_piece = 0x0

    curr_pos = 0
    first_sq = False

    first_sq = True
    curr_pos = pos + 8
    while curr_pos < 0x40:
        curr_piece = (game_state >> (curr_pos * piece_bit_size)) & 0xf
        if curr_piece > 0:
            if curr_piece == enemy_rook or curr_piece == enemy_queen or (first_sq and curr_piece == enemy_king):
                return True
            break
        curr_pos += 8
        first_sq = False

    first_sq = True
    curr_pos = pos - 8
    while curr_pos < pos and curr_pos >= 0:
        curr_piece = (game_state >> (curr_pos * piece_bit_size)) & 0xf
        print(pos, curr_pos, curr_pos * piece_bit_size, curr_piece)
        if curr_piece > 0:
            if curr_piece == enemy_rook or curr_piece == enemy_queen or (first_sq and curr_piece == enemy_king):
                return True
            break
        curr_pos -= 8
        first_sq = False

    first_sq = True
    curr_pos = pos + 1
    while (pos >> 3) == (curr_pos >> 3):
        curr_piece = (game_state >> (curr_pos * piece_bit_size)) & 0xf
        if curr_piece > 0:
            if curr_piece == enemy_rook or curr_piece == enemy_queen or (first_sq and curr_piece == enemy_king):
                return True
            break
        curr_pos += 1
        first_sq = False

    first_sq = True
    curr_pos = pos - 1
    while (pos >> 3) == (curr_pos >> 3):
        curr_piece = (game_state >> (curr_pos * piece_bit_size)) & 0xf
        if curr_piece > 0:
            if curr_piece == enemy_rook or curr_piece == enemy_queen or (first_sq and curr_piece == enemy_king):
                return True
            break
        curr_pos -= 1
        first_sq = False

    first_sq = True
    curr_pos = pos + 9
    while (curr_pos < 0x40) and ((curr_pos & 0x7) > (pos & 0x7)):
        curr_piece = (game_state >> (curr_pos * piece_bit_size)) & 0xf
        if curr_piece > 0:
            if curr_piece == enemy_bishop or curr_piece == enemy_queen or (
                    first_sq and (curr_piece == enemy_king or (
                    curr_piece == enemy_pawn and (enemy_pawn & color_const) == color_const))):
                return True
            break
        curr_pos += 9
        first_sq = False

    first_sq = True
    curr_pos = pos + 7
    while (curr_pos < 0x40) and ((curr_pos & 0x7) < (pos & 0x7)):
        curr_piece = (game_state >> (curr_pos * piece_bit_size)) & 0xf
        if curr_piece > 0:
            if curr_piece == enemy_bishop or curr_piece == enemy_queen or (
                    first_sq and (curr_piece == enemy_king or (
                    curr_piece == enemy_pawn and (enemy_pawn & color_const) == color_const))):
                return True
            break
        curr_pos += 7
        first_sq = False

    first_sq = True
    curr_pos = pos - 7
    while (curr_pos < 0x40) and ((curr_pos & 0x7) > (pos & 0x7)):
        curr_piece = (game_state >> (curr_pos * piece_bit_size)) & 0xf
        if curr_piece > 0:
            if curr_piece == enemy_bishop or curr_piece == enemy_queen or (
                    first_sq and (curr_piece == enemy_king or (
                    curr_piece == enemy_pawn and (enemy_pawn & color_const) == 0x0))):
                return True
            break
        curr_pos -= 7
        first_sq = False

    first_sq = True
    curr_pos = pos - 9
    while (curr_pos < 0x40) and ((curr_pos & 0x7) < (pos & 0x7)):
        curr_piece = (game_state >> (curr_pos * piece_bit_size)) & 0xf
        if curr_piece > 0:
            if curr_piece == enemy_bishop or curr_piece == enemy_queen or (
                    first_sq and (curr_piece == enemy_king or (
                    curr_piece == enemy_pawn and (enemy_pawn & color_const) == 0x0))):
                return True
            break
        curr_pos -= 9
        first_sq = False

    curr_pos = pos + 17
    if (curr_pos < 0x40) and ((curr_pos & 0x7) > (pos & 0x7)) and (
            (game_state >> (curr_pos * piece_bit_size)) & 0xf) == enemy_knight:
        return True

    curr_pos = pos + 15
    if (curr_pos < 0x40) and ((curr_pos & 0x7) < (pos & 0x7)) and (
            (game_state >> (curr_pos * piece_bit_size)) & 0xf) == enemy_knight:
        return True

    curr_pos = pos + 10
    if (curr_pos < 0x40) and ((curr_pos & 0x7) > (pos & 0x7)) and (
            (game_state >> (curr_pos * piece_bit_size)) & 0xf) == enemy_knight:
        return True

    curr_pos = pos + 6
    if (curr_pos < 0x40) and ((curr_pos & 0x7) < (pos & 0x7)) and (
            (game_state >> (curr_pos * piece_bit_size)) & 0xf) == enemy_knight:
        return True

    curr_pos = pos - 17
    if (curr_pos < pos) and ((curr_pos & 0x7) < (pos & 0x7)) and (
            (game_state >> (curr_pos * piece_bit_size)) & 0xf) == enemy_knight:
        return True

    curr_pos = pos - 10
    if (curr_pos < pos) and ((curr_pos & 0x7) < (pos & 0x7)) and (
            (game_state >> (curr_pos * piece_bit_size)) & 0xf) == enemy_knight:
        return True

    curr_pos = pos - 15
    if (curr_pos < pos) and ((curr_pos & 0x7) > (pos & 0x7)) and (
            (game_state >> (curr_pos * piece_bit_size)) & 0xf) == enemy_knight:
        return True

    curr_pos = pos - 6
    if (curr_pos < pos) and ((curr_pos & 0x7) > (pos & 0x7)) and (
            (game_state >> (curr_pos * piece_bit_size)) & 0xf) == enemy_knight:
        return True

    return False


foo = pieceUnderAttack(0xe000000003000000002000000000000000000000000000000000000000000000, 0x3f)

print(foo)